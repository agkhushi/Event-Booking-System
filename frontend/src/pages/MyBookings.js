import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingAPI } from '../services/api';
import { toast } from 'react-toastify';
import './MyBookings.css';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await bookingAPI.getMyBookings();
      setBookings(response.data);
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await bookingAPI.cancel(bookingId);
      toast.success('Booking cancelled successfully');
      fetchBookings();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return <div className="loading">Loading your bookings...</div>;
  }

  return (
    <div className="my-bookings-page">
      <div className="container">
        <h1 className="page-title">My Bookings</h1>

        {bookings.length > 0 ? (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.event.title}</h3>
                  <span className={`status-badge ${booking.bookingStatus}`}>
                    {booking.bookingStatus}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <span className="label">Date:</span>
                    <span>{new Date(booking.event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Time:</span>
                    <span>{booking.event.startTime}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Venue:</span>
                    <span>{booking.event.venue}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Seats:</span>
                    <span>{booking.numberOfSeats}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Total Amount:</span>
                    <span className="amount">${booking.totalAmount}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Payment Status:</span>
                    <span className={`payment-status ${booking.paymentStatus}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Booking Date:</span>
                    <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <Link to={`/events/${booking.event._id}`} className="btn btn-secondary">
                    View Event
                  </Link>
                  {booking.bookingStatus === 'confirmed' && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="btn btn-danger"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <h3>No bookings yet</h3>
            <p>Start exploring events and book your first ticket!</p>
            <Link to="/events" className="btn btn-primary">
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
