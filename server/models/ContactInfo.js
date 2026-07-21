import mongoose from 'mongoose'

const ContactInfoSchema = new mongoose.Schema({
  email: { type: String, required: true, default: 'support@schemeai.com' },
  phone: { type: String, required: true, default: '1800-XXX-XXXX' },
  address: { type: String, required: true, default: 'New Delhi, India' },
}, { timestamps: true })

export default mongoose.model('ContactInfo', ContactInfoSchema)
