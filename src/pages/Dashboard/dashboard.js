
import './dashboard.css';
import Header from '../../components/Heading'
import { Link, redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { supabase } from "../../api/supabase";


const EventCard = ({ event, onDelete }) => {
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', event.id);

      if (error) {
        throw error;
      }

      console.log('Event deleted:', data);
      onDelete(event.id); // Call onDelete function with the deleted event ID
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };

  return (
    <div className="event-card">
      <h3 className='text-bold'>{event.name}</h3>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <div className="cardbuttonGrid mt-2">
        <Link className="cardbutton" to="/check-in">Check In</Link>
        {event.type === "createdEvent" ? (
          <Link className="cardbutton" to="/attendance">Attendance</Link>
        ) : (
          <Link className="cardbutton" to="/history">History</Link>
        )}
        <button className="cardbutton" onClick={handleDelete}>Delete Event</button>
      </div>
    </div>
  );
};




function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function grabUserEvents() {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user.id || null;
      
      const { data, error } = await supabase
        .from('events')
        .select()
        .eq('creator', id);

      if (error) {
        console.error('Error fetching events:', error.message);
      } else {
        setEvents(data || []);
      }
    }

    grabUserEvents();
  }, []);

  const handleDeleteEvent = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId));
  };

  return (
    <div className="App">
      <Header />
      <div id="heading-section">
        <h1>My Registered Events</h1>
        <div id="heading-buttons">
          <Link to="/create" className="create-event">Create Event</Link>
          <Link to="/history" className="create-event">History</Link>
          <Link to="/signout" className="create-event">Sign-out</Link>
        </div>
      </div>

      <div className="events-container">
        <div className="events-grid">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;