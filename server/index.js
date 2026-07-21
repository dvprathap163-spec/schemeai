import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import schemeRoutes from './routes/schemes.js'
import Stat from './models/Stat.js'
import FAQ from './models/FAQ.js'
import Feedback from './models/Feedback.js'
import ContactInfo from './models/ContactInfo.js'
import { protect } from './routes/auth.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gov-schemes'

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB via Compass locally'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use('/api/auth', authRoutes)
app.use('/api/schemes', schemeRoutes)

// ─── Stats ───
app.get('/api/stats', async (req, res) => {
  try {
    let stat = await Stat.findOne()
    if (!stat) stat = await Stat.create({})
    res.json(stat)
  } catch (error) { res.status(500).json({ message: error.message }) }
})
app.put('/api/stats', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    let stat = await Stat.findOne()
    if (!stat) { stat = new Stat(req.body) }
    else {
      stat.schemesCount = req.body.schemesCount ?? stat.schemesCount
      stat.usersCount   = req.body.usersCount   ?? stat.usersCount
      stat.statesCount  = req.body.statesCount  ?? stat.statesCount
      stat.accuracy     = req.body.accuracy     ?? stat.accuracy
    }
    await stat.save()
    res.json(stat)
  } catch (error) { res.status(400).json({ message: error.message }) }
})

// ─── FAQs ───
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 })
    res.json(faqs)
  } catch (error) { res.status(500).json({ message: error.message }) }
})
app.post('/api/faqs', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    const faq = await FAQ.create(req.body)
    res.status(201).json(faq)
  } catch (error) { res.status(400).json({ message: error.message }) }
})
app.put('/api/faqs/:id', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(faq)
  } catch (error) { res.status(400).json({ message: error.message }) }
})
app.delete('/api/faqs/:id', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    await FAQ.findByIdAndDelete(req.params.id)
    res.json({ message: 'FAQ removed' })
  } catch (error) { res.status(400).json({ message: error.message }) }
})

// ─── Feedback ───
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 })
    res.json(feedback)
  } catch (error) { res.status(500).json({ message: error.message }) }
})
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, subject, message, rating } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Missing required feedback fields.' })
    }
    const feedback = await Feedback.create({
      name,
      email,
      subject,
      comment: message,
      rating: Number(rating) || 5,
    })
    res.status(201).json(feedback)
  } catch (error) { res.status(400).json({ message: error.message }) }
})

// ─── Contact Info ───
app.get('/api/contact', async (req, res) => {
  try {
    let contact = await ContactInfo.findOne()
    if (!contact) contact = await ContactInfo.create({})
    res.json(contact)
  } catch (error) { res.status(500).json({ message: error.message }) }
})
app.put('/api/contact', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    let contact = await ContactInfo.findOne()
    if (!contact) contact = new ContactInfo(req.body)
    else {
      contact.email = req.body.email ?? contact.email
      contact.phone = req.body.phone ?? contact.phone
      contact.address = req.body.address ?? contact.address
    }
    await contact.save()
    res.json(contact)
  } catch (error) { res.status(400).json({ message: error.message }) }
})

app.listen(PORT, () => { console.log(`Server running on port ${PORT}`) })
