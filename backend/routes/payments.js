const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const { verifyToken } = require('../middleware/auth');
const emailService = require('../services/emailService');

// Create payment intent
router.post('/create-payment-intent', verifyToken, async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate('event')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.user._id.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // Convert to cents
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        userId: req.userId
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: booking.totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment error', error: error.message });
  }
});

// Confirm payment
router.post('/confirm-payment', verifyToken, async (req, res) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    const booking = await Booking.findById(bookingId)
      .populate('event')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking payment status
    booking.paymentStatus = 'completed';
    booking.paymentId = paymentIntentId;
    await booking.save();

    // Send confirmation email
    await emailService.sendBookingConfirmation(booking);

    res.json({
      message: 'Payment confirmed successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ message: 'Payment confirmation error', error: error.message });
  }
});

module.exports = router;
