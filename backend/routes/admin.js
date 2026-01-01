const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { verifyToken, isAdmin } = require('../middleware/auth');

// All admin routes require authentication and admin role
router.use(verifyToken);
router.use(isAdmin);

// Create event
router.post('/events', async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      createdBy: req.userId,
      availableSeats: req.body.totalSeats
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update event
router.put('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'availableSeats' && key !== 'createdBy') {
        event[key] = req.body[key];
      }
    });

    // If totalSeats changed, adjust availableSeats proportionally
    if (req.body.totalSeats && req.body.totalSeats !== event.totalSeats) {
      const bookedSeats = event.totalSeats - event.availableSeats;
      event.totalSeats = req.body.totalSeats;
      event.availableSeats = Math.max(0, event.totalSeats - bookedSeats);
    }

    await event.save();

    res.json({
      message: 'Event updated successfully',
      event
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete event
router.delete('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bookings (admin)
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate('event', 'title date venue price')
      .sort({ bookingDate: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
      status: 'upcoming'
    });

    res.json({
      totalEvents,
      totalBookings,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
      upcomingEvents
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
