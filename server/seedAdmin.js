import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gov-schemes'

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    const email = 'dvprathap07@gmail.com'
    
    // Check if exists
    const exists = await User.findOne({ email })
    if (exists) {
      exists.is_admin = true
      await exists.save()
      console.log('User already exists, updated to admin status.')
    } else {
      await User.create({
        full_name: 'prathap',
        email: email,
        password: '123456',
        is_admin: true
      })
      console.log('Admin user prathap created successfully.')
    }
    
    process.exit(0)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

createAdmin()
