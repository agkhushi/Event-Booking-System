import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import EventCard from '../components/EventCard';
import { eventAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Events.css';

const Events = () => {
  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, category, sortBy]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = {
        category: category !== 'all' ? category : undefined,
        date: selectedDate ? selectedDate.toISOString().split('T')[0] : undefined,
        sortBy,
        search: search || undefined,
      };

      const response = await eventAPI.getAll(params);
      setEvents(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const clearDate = () => {
    setSelectedDate(null);
  };

  return (
    <div className="events-page">
      <div className="container">
        <h1 className="page-title">Browse Events</h1>

        <div className="events-filters">
          <div className="calendar-section">
            <h3>Select Date</h3>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              minDate={new Date()}
            />
            {selectedDate && (
              <button onClick={clearDate} className="btn btn-secondary clear-date">
                Clear Date
              </button>
            )}
          </div>

          <div className="filters-section">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>

            <div className="filter-group">
              <label>Category:</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="concert">Concerts</option>
                <option value="conference">Conferences</option>
                <option value="workshop">Workshops</option>
                <option value="sports">Sports</option>
                <option value="theater">Theater</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Sort By:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="createdAt">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="events-grid">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="no-events">
            <h3>No events found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
