import mongoose from 'mongoose'

const SchemeSchema = new mongoose.Schema({
  slug: { type: String, unique: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  ministry: { type: String },
  benefits: { type: [String], default: [] },
  documents: { type: [String], default: [] },
  applyUrl: { type: String, default: '' },
  officialUrl: { type: String, default: '' },
  deadline: { type: String, default: '' }
}, { timestamps: true })

export default mongoose.model('Scheme', SchemeSchema)
