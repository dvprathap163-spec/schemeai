import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Scheme from '../models/Scheme.js'
import { buildSchemeTranslations } from '../services/schemeTranslation.js'

dotenv.config({ path: '.env' })

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gov-schemes'

async function backfill() {
  await mongoose.connect(mongoUri)
  const schemes = await Scheme.find().sort({ createdAt: 1 })

  if (schemes.length !== 3) {
    throw new Error(`Expected exactly 3 schemes, found ${schemes.length}. Stopping without changing data.`)
  }

  for (const scheme of schemes) {
    const translations = await buildSchemeTranslations(scheme)
    await Scheme.updateOne({ _id: scheme._id }, { $set: translations })
    console.log(`Translated: ${scheme.name}`)
  }
}

backfill()
  .then(() => mongoose.disconnect())
  .catch(async (error) => {
    console.error(error.message)
    await mongoose.disconnect()
    process.exitCode = 1
  })
