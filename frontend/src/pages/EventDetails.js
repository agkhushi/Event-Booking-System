import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { eventAPI, bookingAPI, paymentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './EventDetails.css';

const stripePromise = loadStripe('pk_test_YOUR_PUBLISHABLE_KEY');

const PaymentForm = ({ bookingId, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      // Create payment intent
      const { data } = await paymentAPI.createIntent({ bookingId });

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        // Confirm payment on backend
        await paymentAPI.confirmPayment({
          bookingId,
          paymentIntentId: result.paymentIntent.id,
        });
        toast.success('Payment successful!');
        onSuccess();
      }
    } catch (error) {
      toast.error('Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      <button type="submit" disabled={!stripe || processing} className="btn btn-success">
        {processing ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numberOfSeats, setNumberOfSeats] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState(null);

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventAPI.getById(id);
      setEvent(response.data);
    } catch (error) {
      toast.error('Failed to fetch event details');
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      toast.info('Please login to book tickets');
      navigate('/login');
      return;
    }

    try {
      const response = await bookingAPI.create({
        eventId: id,
        numberOfSeats,
      });
      setBookingId(response.data.booking._id);
      setShowPayment(true);
      toast.success('Booking created! Please complete payment');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    navigate('/my-bookings');
  };

  if (loading) {
    return <div className="loading">Loading event details...</div>;
  }

  if (!event) {
    return <div className="loading">Event not found</div>;
  }

  const totalPrice = event.price * numberOfSeats;

  return (
    <div className="event-details-page">
      <div className="container">
        <div className="event-details-card">
          <div className="event-image-large">
            <img src={event.image} alt={event.title} />
          </div>

          <div className="event-info">
            <h1>{event.title}</h1>
            <span className={`category-badge ${event.category}`}>
              {event.category}
            </span>

            <div className="event-meta">
              <div className="meta-item">
                <span className="icon">📅</span>
                <div>
                  <strong>Date</strong>
                  <p>{new Date(event.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>

              <div className="meta-item">
                <span className="icon">🕐</span>
                <div>
                  <strong>Time</strong>
                  <p>{event.startTime} - {event.endTime}</p>
                </div>
              </div>

              <div className="meta-item">
                <span className="icon">📍</span>
                <div>
                  <strong>Venue</strong>
                  <p>{event.venue}</p>
                  <p className="address">{event.address}</p>
                </div>
              </div>

              <div className="meta-item">
                <span className="icon">👤</span>
                <div>
                  <strong>Organizer</strong>
                  <p>{event.organizer}</p>
                </div>
              </div>

              <div className="meta-item">
                <span className="icon">💺</span>
                <div>
                  <strong>Availability</strong>
                  <p>{event.availableSeats} / {event.totalSeats} seats available</p>
                </div>
              </div>
            </div>

            <div className="description">
              <h3>About This Event</h3>
              <p>{event.description}</p>
            </div>

            {!showPayment ? (
              <div className="booking-section">
                <div className="price-info">
                  <span className="price-label">Price per ticket:</span>
                  <span className="price">${event.price}</span>
                </div>

                {event.availableSeats > 0 ? (
                  <>
                    <div className="seats-selector">
                      <label>Number of Seats:</label>
                      <input
                        type="number"
                        min="1"
                        max={event.availableSeats}
                        value={numberOfSeats}
                        onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                      />
                    </div>

                    <div className="total-price">
                      <strong>Total: ${totalPrice}</strong>
                    </div>

                    <button onClick={handleBooking} className="btn btn-primary btn-large">
                      Book Now
                    </button>
                  </>
                ) : (
                  <div className="sold-out">
                    <h3>Sold Out</h3>
                    <p>This event is currently sold out</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="payment-section">
                <h3>Complete Payment</h3>
                <p>Amount to pay: ${totalPrice}</p>
                <Elements stripe={stripePromise}>
                  <PaymentForm bookingId={bookingId} onSuccess={handlePaymentSuccess} />
                </Elements>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
