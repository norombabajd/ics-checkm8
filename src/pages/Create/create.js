import Header from '../../components/Heading'
import React, { useState } from 'react';
import './create.css'
import '../../index.js'


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
            <div className='flex flex-col max-w px-36 py-36 items-center'>
            <div className='card rounded-xl flex flex-col gap-2 p-10 shadow-lg'>
            <h1>Create Event</h1>

            <form onSubmit={handleSubmit} className="form-container">
                
                <p className="w-full">
                    Name
                    <input  name="eventName" value={formData.eventName} onChange={handleChange} className="input-field" />
                </p>

                <p className="w-full py-1">
                    Check-in Date & Time
                    <input type="datetime-local" name="eventTime" value={formData.eventTime} onChange={handleChange} className="input-field" />
                </p>

                <p className="w-full py-1">
                    Check-in Closing Date & Time
                    <input type="datetime-local" name="eventTime" value={formData.eventTime} onChange={handleChange} className="input-field" />
                </p>

                <p className="w-full py-1"> 
                    Location
                    <input  name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="input-field" />
                </p>
                
                <p className="w-full py-1">
                    Keyword
                    <input  name="eventKeyword" value={formData.eventKeyword} onChange={handleChange} className="input-field" />
                </p>


                <div className='w-full'>

                <p className="flex grid"> Additional Options
                </p>

                    <div>
                        <input type="checkbox" id="" name="" value=""></input>
                        <label> This event is for mature audiences (18+).</label>
                    </div>

                    <div>
                        <input type="checkbox" id="" name="" value=""></input>
                        <label> Allow early check-in (30min before).</label>
                    </div>
                
                
                </div>
                
                
                
                
                

                <button type="submit" className="submit-button">
                    Submit
                </button>
            </form>
            </div>
            </div> 


        </div>

    );
}
export default Create;