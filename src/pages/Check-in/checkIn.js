
import Header from '../../components/Heading'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './checkIn.css'
import '../../index.css'

const eventOptions = [
    { id: 'EventA', name: 'Event A' },
    { id: 'EventB', name: 'Event B' },
    { id: 'EventC', name: 'Event C' },
];


function CheckIn() {

    const [formData, setFormData] = useState({
        event: '',
        passphrase: '',
    });

    const handleDropdownChange = (e) => {
        setFormData({ ...formData, event: e.target.value });
    };

    const handlePassphraseChange = (e) => {
        setFormData({ ...formData, passphrase: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        // Reset the form after submission
        setFormData({ event: '', passphrase: '' });
    };

    return (
        <div>
            <Header />
            <div className='flex flex-col max-w px-36 py-36 items-center'>
                <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
                <form onSubmit={handleSubmit} className="form-container">
                <h1>Check-in</h1>
                <label className="label-container">
                    Select Event
                    <select value={formData.event} onChange={handleDropdownChange} className="input-field">
                        <option value="">--Please choose an event--</option>
                        {eventOptions.map((option) => (
                            <option key={option.id} value={option.name}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="label-container">
                    Passphrase
                    <input type="password" value={formData.passphrase} onChange={handlePassphraseChange} className="input-field" />
                </label>
                <p>Your current location is: **location goes here**</p>
                <button class='create-button' type="submit">
                    Submit
                </button>
            </form>
                
                    
                </div>
            </div>            
        </div>

    );
}
export default CheckIn;