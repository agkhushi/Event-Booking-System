import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const categories = [
    { name: 'Concerts', icon: '🎵', color: '#dc3545' },
    { name: 'Conferences', icon: '💼', color: '#28a745' },
    { name: 'Workshops', icon: '🎓', color: '#ffc107' },
    { name: 'Sports', icon: '⚽', color: '#17a2b8' },
    { name: 'Theater', icon: '🎭', color: '#6c757d' },
    { name: 'Other', icon: '🎪', color: '#007bff' },
  ];

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Discover Amazing Events</h1>
            <p className="hero-subtitle">
              Book tickets for concerts, conferences, workshops, and more!
            </p>
            <Link to="/events" className="btn btn-primary btn-large">
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3>Easy Booking</h3>
              <p>Book your tickets in just a few clicks with our simple interface</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💳</div>
              <h3>Secure Payments</h3>
              <p>Safe and secure payment processing with Stripe</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3>Event Reminders</h3>
              <p>Never miss an event with our automated reminder system</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Book events on any device - desktop, tablet, or mobile</p>
            </div>
          </div>
        </div>
      </section>

      <section className="categories">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/events?category=${category.name.toLowerCase()}`}
                className="category-card"
                style={{ borderColor: category.color }}
              >
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
