const nodemailer = require('nodemailer');
const Booking = require('../models/Booking');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send booking confirmation
exports.sendBookingConfirmation = async (booking) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.user.email,
      subject: 'Booking Confirmation - Event Booking System',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${booking.user.name},</p>
        <p>Your booking has been confirmed!</p>
        <h3>Event Details:</h3>
        <ul>
          <li><strong>Event:</strong> ${booking.event.title}</li>
          <li><strong>Date:</strong> ${new Date(booking.event.date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${booking.event.startTime} - ${booking.event.endTime}</li>
          <li><strong>Venue:</strong> ${booking.event.venue}</li>
          <li><strong>Number of Seats:</strong> ${booking.numberOfSeats}</li>
          <li><strong>Total Amount:</strong> $${booking.totalAmount}</li>
        </ul>
        <p>Thank you for booking with us!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Booking confirmation email sent to:', booking.user.email);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

// Send event reminders
exports.sendEventReminders = async () => {
  try {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const dayAfterTomorrow = new Date(tomorrow);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

    // Find bookings for events happening tomorrow
    const bookings = await Booking.find({
      paymentStatus: 'completed',
      bookingStatus: 'confirmed',
      reminderSent: false
    })
    .populate('event')
    .populate('user');

    for (const booking of bookings) {
      const eventDate = new Date(booking.event.date);
      eventDate.setHours(0, 0, 0, 0);

      if (eventDate.getTime() === tomorrow.getTime()) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: booking.user.email,
          subject: 'Event Reminder - Tomorrow!',
          html: `
            <h1>Event Reminder</h1>
            <p>Dear ${booking.user.name},</p>
            <p>This is a reminder that your event is <strong>tomorrow</strong>!</p>
            <h3>Event Details:</h3>
            <ul>
              <li><strong>Event:</strong> ${booking.event.title}</li>
              <li><strong>Date:</strong> ${new Date(booking.event.date).toLocaleDateString()}</li>
              <li><strong>Time:</strong> ${booking.event.startTime}</li>
              <li><strong>Venue:</strong> ${booking.event.venue}</li>
              <li><strong>Address:</strong> ${booking.event.address}</li>
            </ul>
            <p>We look forward to seeing you!</p>
          `
        };

        await transporter.sendMail(mailOptions);
        booking.reminderSent = true;
        await booking.save();
        console.log('Reminder sent to:', booking.user.email);
      }
    }
  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};

module.exports = exports;
