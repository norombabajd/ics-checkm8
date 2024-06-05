
import Header from '../../components/Heading'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './checkIn.css'
import '../../index.css'
import { supabase } from '../../api/supabase';
import Modal from './badlocation';



//Geolocation of device
const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};


//Get UUID function
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


function CheckIn() {

    const [isOpen, setIsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const initialFormData = {
        userID: '',
        event: '',
        eventID: '',
        passphrase: '',
        checkedIn: false,
        date: '',
    };


    const [formData, setFormData] = useState(initialFormData);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handlePassphraseChange = (e) => {
        setFormData({ ...formData, passphrase: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getUserId(formData)
        formData.date = new Date().toISOString().split('T')[0];
        formData.checkedIn = true
        getCurrentLocation()
        // Handle form submission logic here
        console.log(formData);
        // Reset the form after submission
        setFormData(initialFormData);
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
                    <form onSubmit={handleSubmit} className="form-container">
                        <h1>Check-in</h1>
                        <label className="label-container">
                            Event Name:
                            <input name="event" value={formData.event} onChange={handleChange} className="input-field" required />

                        </label>
                        <label className="label-container">
                            Event ID:
                            <input name="eventID" value={formData.eventID} onChange={handleChange} className="input-field" required />
                        </label>
                        <label className="label-container">
                            Passphrase:
                            <input type="password" value={formData.passphrase} onChange={handlePassphraseChange} className="input-field" required />
                        </label>
                        <p>Your current location is: **location goes here**</p>
                        <button class='create-button' type="submit">
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