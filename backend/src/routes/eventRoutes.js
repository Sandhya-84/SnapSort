
import express from 'express'

const router = express.Router()

let events = []
let nextEventId = 1

// Create a new event
router.post('/', (req, res) => {
  const { name, description, date, location } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: 'Event name is required',
    })
  }

  const event = {
    id: nextEventId++,
    name: name.trim(),
    description: description || '',
    date: date || '',
    location: location || '',
    createdAt: new Date().toISOString(),
  }

  events.push(event)

  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    event,
  })
})

// Get all events
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: events.length,
    events,
  })
})

// Get one event by ID
router.get('/:id', (req, res) => {
  const event = events.find(
    (item) => item.id === Number(req.params.id)
  )

  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found',
    })
  }

  res.json({
    success: true,
    event,
  })
})

export default router
