import Header from '../../components/Heading';
import React, { useState } from 'react';
import './create.css';
import { userid } from '../auth/login.js';
import Modal from './wrongdate.js';
import { supabase } from '../../api/supabase.js';




const getUserId = async (formData) => {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            throw error;
        }
        const id = user?.id || null;
        // console.log(id);
        formData.creator = id;
    } catch (error) {
        console.error('Error getting user ID:', error.message);
    }
};


const geocode = async (inputAddress) => {
    const address = inputAddress;
    const apiKey = '5b3ce3597851110001cf6248cc4f90bfc3004a36ba42040bc0461132';
    const apiUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const location = data.features[0].geometry;
        return [location.coordinates[1], location.coordinates[0]];
    } catch (error) {
        console.error('Error fetching geocode:', error);
        return [0, 0]; // Return default coordinates in case of error
    }
};

function Create() {


    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialFormData = {
        name: '',
        location: '',
        longitude: '',
        latitude: '',
        keyword: '',
        date: '',
        start: '',
        end: '',
        matureAudience: false,
        earlyCheck: false,
        attendees: [],
    };
    const [formData, setFormData] = useState(initialFormData);


    getUserId(formData)
    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { start, end, location } = formData;
        if (new Date(start) >= new Date(end)) {
            setIsOpen(true);
            setErrorMessage('Start date must be before end date.');
            return;
        }

        const convertedFormData = {
            ...formData,
            start: formData.start ? new Date(formData.start).toISOString() : null,
            end: formData.end ? new Date(formData.end).toISOString() : null,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            const coordinates = await geocode(location);
            if (coordinates[0] === 0 && coordinates[1] === 0) {
                setIsOpen(true);
                setErrorMessage("Please Enter a Valid Address or Location");
                return;
            } else {
                convertedFormData.latitude = coordinates[0];
                convertedFormData.longitude = coordinates[1];
            }

            console.log('Form Data Before Submission:', convertedFormData);

            // Make API call to create event
            const response = await fetch('http://localhost:4000/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(convertedFormData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data inserted:', data);
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setErrorMessage('');
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36 py-36 items-center'>
                <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
                    <h1>Create Event</h1>

                    <form onSubmit={handleSubmit} className="form-container">
                        <p className="w-full">
                            Name
                            <input name="name" value={formData.name} onChange={handleChange} className="input-field" required />
                        </p>

                        <p className="w-full py-1">
                            Check-in Date & Time
                            <input type="datetime-local" name="start" value={formData.start} onChange={handleChange} className="input-field" required />
                        </p>

                        <p className="w-full py-1">
                            Check-in Closing Date & Time
                            <input type="datetime-local" name="end" value={formData.end} onChange={handleChange} className="input-field" required />
                        </p>

                        <p className="w-full py-1">
                            Location
                            <input name="location" value={formData.location} onChange={handleChange} className="input-field" required />
                        </p>

                        <p className="w-full py-1">
                            Keyword
                            <input name="keyword" value={formData.keyword} onChange={handleChange} className="input-field" required />
                        </p>

                        <div className='w-full'>
                            <p className="flex grid"> Additional Options</p>

                            <div>
                                <input
                                    type="checkbox"
                                    name="matureAudience"
                                    checked={formData.matureAudience}
                                    onChange={handleChange}
                                />
                                <label> This event is for mature audiences (18+).</label>
                            </div>

                            <div>
                                <input
                                    type="checkbox"
                                    name="earlyCheck"
                                    checked={formData.earlyCheck}
                                    onChange={handleChange}
                                />
                                <label> Allow early check-in (30min before event).</label>
                            </div>
                        </div>

                        <button type="submit" className="submit-button">
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

export default Create;
