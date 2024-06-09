import Header from '../../components/Heading';
import './attendence.css';
import React, { useState } from 'react';
import { supabase } from '../../api/supabase';
import { useEffect } from 'react';


// Need to implement size of name control upon input 
function Attendance() {
    const [attendees, setAttendees] = useState([]);
    const [attendeeName, setAttendeeName] = useState('');
    const [events, setEvents] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectChange = (event) => {
        const [itemName, itemId] = event.target.value.split(',');
        fetchAttendees(itemId)
        setSelectedItem(`Event Name: ${itemName} / Event ID: ${itemId}`);
    }

    async function fetchUserEvents() {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }
            const response = await fetch('http://localhost:4000/api/user-events', {
                method: 'GET',
                headers: {
                    uuid: user?.id || null,
                    
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setEvents(data);
            console.log(data)


        } catch (error) {
            console.error('Error fetching events:', error.message);
        }
    }
    useEffect(() => {
        fetchUserEvents();
    }, []);




    async function fetchAttendees(eventID) {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                throw error;
            }
            const response = await fetch('http://localhost:4000/api/attendees', {
                method: 'GET',
                headers: {
                    event:  eventID || null,
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAttendees(data);
        } catch (error) {
            console.error('Error fetching attendees:', error.message);
        }
    }




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
                <span>{attendee.firstName} {attendee.lastName}</span>
                <span>{attendee.email}</span>
                <span>{attendee.date}</span>
                <button onClick={removeAttendee}>Remove</button>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36'>
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

                <div>
                    <label htmlFor="dropdown">Choose an item:</label>
                    <select id="dropdown" value={selectedItem} onChange={handleSelectChange}>
                        <option value="">Select an item</option>
                        {events.map((item) => (
                            <option key={item.name} value={`${item.name},${item.id}`}>
                                <p>Event: {item.name} / Event ID: {item.id}</p>
                            </option>
                        ))}
                    </select>
                    {selectedItem && (
                        <p>
                            Attendance For: {selectedItem}
                        </p>
                    )}
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
