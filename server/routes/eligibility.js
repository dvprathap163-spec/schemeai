import express from 'express'

const router = express.Router()
const mlServiceUrl = (process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

router.post('/predict', async (req, res) => {
  try {
    const response = await fetch(`${mlServiceUrl}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      signal: AbortSignal.timeout(15000),
    })
    const payload = await response.json()
    res.status(response.status).json(payload)
  } catch (error) {
    res.status(503).json({
      message: 'Eligibility prediction service is unavailable.',
      detail: error.message,
    })
  }
})

export default router
