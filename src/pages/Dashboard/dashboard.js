
import './dashboard.css';
import Header from '../../components/Heading'
import { Link, redirect } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { supabase } from "../../api/supabase";

import userid from "../auth/login";


const dummyevents = [
  {
    name: 'Beach Clean-Up',
    location: 'Corona Del Mar, CA',
    date: '05/29/24',
    time: '10:00am-12:00pm',
    buttons: 'History'
  },
  {
    name: 'Running Club',
    location: 'Newport Beach, CA',
    date: '05/20/24',
    time: '8:00am-11:00am',
    buttons: 'Attendance'
  },
  {
    name: 'Web Development Conference',
    location: 'Boston, MA',
    date: '06/02/24',
    time: '9:00am-8:00pm',
    buttons: 'History'
  },
  {
    name: 'Running Club',
    location: 'Corona Del Mar, CA',
    date: '06/17/24',
    time: '8:00am-11:00am',
    type: 'History'
  },
  {
    name: 'Coffee & Cars',
    location: 'Costa Mesa, CA',
    date: '06/20/24',
    time: '10:00am-12:00pm',
    type: 'createdEvent'
  }
];

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3 className='text-bold'>{event.name}</h3>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <div class="cardbuttonGrid mt-2">
        <Link class="cardbutton" to="/check-in">Check In</Link>
        {event.type === "createdEvent" ? (
          <Link className="cardbutton" to="/attendence">Attendance</Link>
        ) : (
          <Link className="cardbutton" to="/history">History</Link>
        )}
      </div>
    </div>
  );
};


function Dashboard() {
  const [event, setEvents] = useState([]);
  useEffect(() => {
    async function GrabUserEvents() {
      const { data: { user } } = await supabase.auth.getUser()
      var id = user.id;
      
      const { data, error } = await supabase
        .from('events')
        .select()
        .eq('creator', id)
      
      console.log(data);

      setEvents(data);

    }
    GrabUserEvents();
    
    

}, []);


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
          {event.map(event => (
            <EventCard key={event.name} event={event} />
          ))}
        </div>

      </div>

    </div>
  );
}
export default Dashboard;
