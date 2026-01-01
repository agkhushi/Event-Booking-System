import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <span className={`category-badge ${event.category}`}>
          {event.category}
        </span>
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-description">
          {event.description.substring(0, 100)}...
        </p>
        
        <div className="event-details">
          <div className="detail-item">
            <span className="icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="detail-item">
            <span className="icon">🕐</span>
            <span>{event.startTime}</span>
          </div>
          <div className="detail-item">
            <span className="icon">📍</span>
            <span>{event.venue}</span>
          </div>
          <div className="detail-item">
            <span className="icon">💺</span>
            <span>{event.availableSeats} seats left</span>
          </div>
        </div>
        
        <div className="event-footer">
          <div className="price">${event.price}</div>
          <Link to={`/events/${event._id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
