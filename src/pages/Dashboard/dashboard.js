import './dashboard.css';
import Header from '../../components/Heading'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import supabase from '../../../src/api/supabase.js';



const events = [
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
      <h3>{event.name}</h3>
      <p>{event.location}</p>
      <p>{event.date}</p>
      <p>{event.time}</p>
      <div class="cardbuttonGrid">
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
  const [count, setCount] = useState(0);
  return (
    <div className="App">
      <Header />
      <div id="heading-section">
        <h1>My Registered Events</h1>
        <div id="heading-buttons">
          <Link to="/create" className="create-event">Create Event</Link>
          <Link to="/history" className="create-event">History</Link>

        </div>
      </div>

      <div className="events-container">
        <div className="events-grid">
          {events.map(event => (
            <EventCard key={event.name} event={event} />
          ))}
        </div>

      </div>

    </div>
  );
}
export default Dashboard;
