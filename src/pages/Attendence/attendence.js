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
            <div className='flex flex-col max-w m-12 gap-2'>
                <h2 className='flex font-bold justify-center'>Add Attendee</h2>
                {selectedItem && (
                        <p className='flex justify-center'>
                            {selectedItem}
                        </p>
                    ) || <p className='flex justify-center'>To add an attendee to an event you created, select an item from the list. Emails are case-sensitive, you must add users who have a checkm8 account.</p>}
                
                
                <div className='flex justify-center'>
                <div className='border-2 border-[#ddd] w-fit p-2 rounded-md mr-2 text-base box-border'>
                    <select className='' id="dropdown" value={selectedItem} onChange={handleSelectChange}>
                        <option>Events Created by Me</option>
                        {events.map((item) => (
                            <option key={item.name} value={`${item.name},${item.id}`}>
                                <p>{item.name} /ID: {item.id}</p>
                            </option>
                        ))}
                    </select>
                </div>
                </div>



                <div className="flex align-center mt-5">
                    <input
                        type="text"
                        value={attendeeName}
                        onChange={(e) => setAttendeeName(e.target.value)}
                        placeholder="Enter attendee email"
                    />
                    <button class='add-button' onClick={addAttendee}>Add Attendee</button>
                </div>

                <h2 className='font-bold mt-5'>Attendees</h2>
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
