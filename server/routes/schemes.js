import express from 'express'
import Scheme from '../models/Scheme.js'
import User from '../models/User.js'
import { protect } from './auth.js'
import { buildSchemeTranslations } from '../services/schemeTranslation.js'

const router = express.Router()

// Get all schemes
router.get('/', async (req, res) => {
  try {
    const schemes = await Scheme.find()
    res.json(schemes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Add new scheme (admin only in real world)
router.post('/', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    const payload = req.body
    const translations = await buildSchemeTranslations(payload)
    const scheme = await Scheme.create({ ...payload, ...translations })
    res.status(201).json(scheme)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update scheme
router.put('/:id', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    const payload = req.body
    const translations = await buildSchemeTranslations(payload)
    const scheme = await Scheme.findByIdAndUpdate(req.params.id, { ...payload, ...translations }, { new: true })
    res.json(scheme)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete scheme
router.delete('/:id', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    await Scheme.findByIdAndDelete(req.params.id)
    res.json({ message: 'Scheme removed' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Get saved schemes for user
router.get('/saved/list', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('saved_schemes')
    res.json(user.saved_schemes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Save a scheme
router.post('/saved/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user.saved_schemes.includes(req.params.id)) {
      user.saved_schemes.push(req.params.id)
      await user.save()
    }
    res.json({ message: 'Scheme saved' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
