import mongoose from 'mongoose'

const StatSchema = new mongoose.Schema({
  schemesCount: { type: Number, default: 150 },
  usersCount: { type: Number, default: 2000000 },
  statesCount: { type: Number, default: 36 },
  accuracy: { type: Number, default: 95 }
}, { timestamps: true })

export default mongoose.model('Stat', StatSchema)
