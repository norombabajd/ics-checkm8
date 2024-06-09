import Header from '../../components/Heading';
import { Link } from "react-router-dom";
import './attendence.css';
import React, { useState } from 'react';


// Need to implement size of name control upon input 

function Attendance() {
    const [attendees, setAttendees] = useState([]);

    
    const [attendeeName, setAttendeeName] = useState('');

    const addAttendee = () => {
        if (attendeeName.trim() !== '') {
            const newAttendee = {
                name: attendeeName,
                timestamp: new Date().toLocaleString()
            };
            setAttendees([...attendees, newAttendee]);
            setAttendeeName('');
        }
    };

    const removeAttendee = (index) => {
        const newAttendees = attendees.filter((_, i) => i !== index);
        setAttendees(newAttendees);
    };

    const AttendeeCard = ({ attendee, removeAttendee }) => {
        return (
            <div className="attendee-card">
                <span>{attendee.name}</span>
                <span>{attendee.timestamp}</span>
                <button onClick={removeAttendee}>Remove</button>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36 '>
                <h2>Add Attendee</h2>
                <div className="flex align-center">
                    <input
                        type="text"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Enter attendee email"
                    />
                    <button class='add-button' onClick={addAttendee}>Add Attendee</button>
                </div>
                <h2>Attendees</h2>
                <div className="attendees-list">
                    {attendees.map((attendee, index) => (
                        <AttendeeCard key={index} attendee={attendee} removeAttendee={() => removeAttendee(index)} />
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Attendance;
