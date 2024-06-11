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


  const getUserId = async () => {
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
          <Link className="cardbutton" to="/attendance"  >Attendance</Link>
        ) : (
          <Link className="cardbutton" to="/history">History</Link>
        )}
        <a className="cardbutton" onClick={handleDelete}>Delete Event</a>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const handleDeleteEvent = (deletedEventId) => {
    setEvents(events.filter((event) => event.id !== deletedEventId));
    //fetchUserEvents();
  };

  useEffect(() => {async function fetchUserEvents() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        throw error;
      }

      const { data: userData, error: userError } = await supabase
        .from('user-demographics')
        .select('attending')
        .eq('id', user.id)
        .single();
          
      if (userError) {
          throw userError;
      }

      if (!userData) {
          console.error('User not found with the ID:', user.id);
          return [];
      }

      const { attending } = userData;
      console.log(attending);

      if (!attending || attending.length === 0) {
        console.log('User is not attending any events.');
        return [];
      }

      // Fetch event details for each event attended by the user
      const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('name', 'location', 'start', 'end', 'creator', 'matureAudience', 'earlyCheck')
          .in('id', attending);

      if (eventsError) {
          throw eventsError;
      }

      setEvents(eventsData);

    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  }
  fetchUserEvents();
}, []); 

  
  return (
    <div className="App">
      <Header />
      <div className='flex flex-col max-w md:px-36'>
        <p className='text-2xl font-bold content-center'>Dashboard</p>
        
        <div className='flex flex-col md:flex-row items-center' id="heading-buttons">
          <Link to="/create" className="create-event">New Event</Link>
          <Link to="/history" className="create-event">History</Link>
          <Link to="/signout" className="create-event">Sign-out</Link>
      </div>
        


      </div>

      <div className="events-container">
        <div className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2">
          {events.map((event) => (
            <EventCard key={event.id} event={event} onDelete={handleDeleteEvent} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
