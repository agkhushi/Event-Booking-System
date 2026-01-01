const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { verifyToken } = require('../middleware/auth');

// Get all events (public)
router.get('/', async (req, res) => {
  try {
    const { category, date, search, sortBy } = req.query;
    let query = { status: { $ne: 'cancelled' } };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } }
      ];
    }

    let sort = {};
    if (sortBy === 'date') sort.date = 1;
    else if (sortBy === 'price') sort.price = 1;
    else sort.createdAt = -1;

    const events = await Event.find(query)
      .sort(sort)
      .populate('createdBy', 'name email');

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check availability
router.get('/:id/availability', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({
      available: event.availableSeats > 0,
      availableSeats: event.availableSeats,
      totalSeats: event.totalSeats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
