import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d'
  })
}

// Middleware to protect routes
export const protect = async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret')
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

router.post('/signup', async (req, res) => {
  const { full_name, email, password } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ full_name, email, password })
    if (user) {
      res.status(201).json({
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user._id)
      })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        is_admin: user.is_admin,
        token: generateToken(user._id)
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/me', protect, (req, res) => {
  res.json(req.user)
})

// Get all users (admin only)
router.get('/users', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Delete a user (admin only)
router.delete('/users/:id', protect, async (req, res) => {
  if (!req.user.is_admin) return res.status(403).json({ message: 'Forbidden' })
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'User removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
