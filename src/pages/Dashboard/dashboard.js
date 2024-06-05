import './dashboard.css';
import Header from '../../components/Heading';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { supabase } from "../../api/supabase";
import '../../index.css'


const EventCard = ({ event, onDelete }) => {
  const [userID, setUserID] = useState(null)
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/events/${event.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Event deleted:', data);
      onDelete(event.id);
    } catch (error) {
      console.error('Error deleting event:', error.message);
    }
  };


  const getUserId = async (userID) => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }
      const id = user?.id || null;
      setUserID(id);
    } catch (error) {
      console.error('Error getting user ID:', error.message);
    }
  };
  getUserId(userID)



  return (
    <div className="event-card">
      <h3 className='text-bold'>{event.name}</h3>
      <p>{event.location}</p>
      <p><b>ID: </b>{event.id}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <div className="cardbuttonGrid mt-2">
        <Link className="cardbutton" to="/check-in">Check In</Link>
        {event.creator === userID ? (
          <Link className="cardbutton" to="/attendence">Attendance</Link>
        ) : (
          <Link className="cardbutton" to="/history">History</Link>
        )}
        <button className="cardbutton" onClick={handleDelete}>Delete Event</button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [events, setEvents] = useState([]);
 const handleDeleteEvent = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId));
  };
  useEffect(() => {
    async function grabUserEvents() {
      const { data: { user } } = await supabase.auth.getUser();
      const id = user.id;
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
  }, [handleDeleteEvent]);

 

  return (
    <div className="App">
      <Header />
      <div className='flex flex-col max-w px-36 py-36'>
        <p className='text-2xl font-bold content-center'>Dashboard</p>
        <div className='flex flex-col md:flex-row items-center' id="heading-buttons">
          <Link to="/create" className="create-event">New Event</Link>
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
