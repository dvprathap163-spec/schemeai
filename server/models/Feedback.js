import mongoose from 'mongoose'

const FeedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
}, { timestamps: true })

FeedbackSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 })

export default mongoose.model('Feedback', FeedbackSchema)
