import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import eventRoutes from './routes/eventRoutes.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SnapSort API!',
    status: 'Server is running'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'SnapSort backend is healthy'
  })
})
app.use('/api/events', eventRoutes)
app.listen(PORT, () => {
  console.log(`SnapSort server running on http://localhost:${PORT}`)
})
