import Header from '../../components/Heading'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './checkIn.css'
import '../../index.css'
import { supabase } from '../../api/supabase';
import Modal from './badlocation';

// Get UUID function
const getUserId = async (formData) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            throw error;
        }
        const id = user?.id || null;
        formData.userID = id;
    } catch (error) {
        console.error('Error getting user ID:', error.message);
    }
};


function getCurrentDateTime24Hour() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const date = `${year}-${month}-${day}`;
  const time = `${hours}:${minutes}:${seconds}`;

  return `${date} ${time}`;
}

function CheckIn() {
    const [correctDistance, setCorrectDistance] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const closeModal = () => {
        setIsOpen(false);
        setErrorMessage('');
    };

    const initialFormData = {
        userID: '',
        eventID: '',
        checkedIn: false,
        date: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [eventName, setEventName] = useState('')
    const [keyword, setkeyword] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEventNameChange = (e) => {
         setEventName(e.target.value);

    }

    const handlePassphraseChange = (e) => {
        setkeyword(e.target.value);
    };

    const getCurrentLocation = async() => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                    return position.coords
                },
                (error) => {
                    reject(error);
                    setErrorMessage("Please Allow Location Access in Settings");
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
    };


    const fetchLocation = async (id, name, password) => {
        try {
            const response = await fetch('http://localhost:4000/location', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, password }),
            });

            const data = await response.json();
            if (data.error) {
                setErrorMessage("Event Does Not Exist, Please Enter Correct Event Details");
            } else {
                console.log("Event Location", data);
                return data
                
            }
        } catch (error) {
            console.log(error);
        }
    };

    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    const haversineDistance = (lat1, lon1, lat2, lon2) => {
        lat1 = toRadians(lat1);
        lon1 = toRadians(lon1);
        lat2 = toRadians(lat2);
        lon2 = toRadians(lon2);
        const dlon = lon2 - lon1;
        const dlat = lat2 - lat1;
        const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = 6371 * c * 0.621371;
        return distance;
    };

    const isWithinAMile = (lat1, lon1, lat2, lon2) => {
        const distance = haversineDistance(lat1, lon2, lat2, lon2);
        console.log("this is the distance", distance,lat1,lon1, lat2, lon2);
        return distance <= 2;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await getUserId(formData);
        
    try {
        const fetechedLoc = await fetchLocation(formData.eventID, eventName,keyword);
        const localLoc = await getCurrentLocation();
        const distanceCheck = isWithinAMile(localLoc.latitude,localLoc.longitude, fetechedLoc.latitude, fetechedLoc.longitude);
        setCorrectDistance(distanceCheck);
        if (distanceCheck) {
            setFormData((prevData) => ({ ...prevData, checkedIn: correctDistance }));
            formData.date =  getCurrentDateTime24Hour()
            formData.checkedIn = true
            console.log(formData);
            try {
                const response = await fetch('http://localhost:4000/api/addAttendee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('API endpoint not found');
                    } else if (response.status === 401) {
                        throw new Error('Unauthorized access');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }

                const data = await response.json();
                console.log(data);

                // Use the response data as needed (e.g., update state)
            } catch (error) {
                console.error('Error:', error.message);
                // Handle the error (e.g., show error message to the user)
            }
    } else {
        setErrorMessage("You are currently too far away from the event, please check in again when you are closer");
        setIsOpen(true);
    }
        setFormData(initialFormData);
        setkeyword('')
        setEventName('')
    } catch (error) {
        console.log(error)
        setIsOpen(true);
        return;
    }
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36 items-center'>
                <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
                    <form onSubmit={handleSubmit} className="form-container">
                        <h1>Check-in</h1>
                        <label className="label-container">
                            Event Name:
                            <input name="event" value={eventName} onChange={handleEventNameChange}className="input-field" required />
                        </label>
                        <label className="label-container">
                            Event ID:
                            <input name="eventID" value={formData.eventID} onChange={handleChange} className="input-field" required />
                        </label>
                        <label className="label-container">
                            Passphrase:
                            <input type="password" value={keyword} onChange={handlePassphraseChange} className="input-field" required />
                        </label>
                        <button className='create-button' type="submit">
                            Submit
                        </button>
                    </form>
                    <Modal isOpen={isOpen} onClose={closeModal}>
                        <div className="modal-content">
                            <h2>Error</h2>
                            <p>{errorMessage}</p>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default CheckIn;