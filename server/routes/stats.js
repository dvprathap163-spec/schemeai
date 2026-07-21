import express from 'express'
import Stat from '../models/Stat.js'
import { protect } from './auth.js'

const router = express.Router()

// Get stats
router.get('/', async (req, res) => {
  try {
    let stat = await Stat.findOne()
    if (!stat) {
      stat = await Stat.create({})
    }
    res.json(stat)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Update stats (admin only)
router.put('/', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    let stat = await Stat.findOne()
    if (!stat) {
      stat = new Stat(req.body)
    } else {
      stat.schemesCount = req.body.schemesCount ?? stat.schemesCount
      stat.usersCount = req.body.usersCount ?? stat.usersCount
      stat.statesCount = req.body.statesCount ?? stat.statesCount
      stat.accuracy = req.body.accuracy ?? stat.accuracy
    }
    await stat.save()
    res.json(stat)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
