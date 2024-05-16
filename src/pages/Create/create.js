import Header from '../../components/Heading'
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import './create.css'


function Create() {
    const [formData, setFormData] = useState({
        eventName: '',
        eventTime: '',
        eventLocation: '',
        eventKeyword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            eventName: '',
            eventTime: '',
            eventLocation: '',
            eventKeyword: '',
        });
        // Handle form submission logic here
    };
    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit} className="form-container">
                <label className="label-container">
                    Name of Event
                    <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} className="input-field" />
                </label>
                <label className="label-container">
                    Time of Event
                    <input type="text" name="eventTime" value={formData.eventTime} onChange={handleChange} className="input-field" />
                </label>
                <label className="label-container">
                    Location
                    <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="input-field" />
                </label>
                <label className="label-container">
                    Keyword
                    <input type="text" name="eventKeyword" value={formData.eventKeyword} onChange={handleChange} className="input-field" />
                </label>
                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>




        </div>

    );
}
export default Create;