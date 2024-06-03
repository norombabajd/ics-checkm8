import Header from '../../components/Heading'
import React, { useState } from 'react';
import './create.css'
import '../../index.js'
import { userid } from '../auth/login.js';


import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rpnukhbkfykwutyntnkw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4'
const supabase = createClient(supabaseUrl, supabaseKey)


function Create() {
    console.log(userid)
    const [formData, setFormData] = useState({
        id: 12345678,
        creator: '',
        name: 'hello world',
        location: 'some place in china',
        longitude: 23.332,
        latitude: 233.2323,
        date: "2024-05-20",
        start: '10:00:00',
        end: '10:00:00',
        attendees: [],


        // eventName: '',
        // eventTime: '',
        // eventLocation: '',
        // eventKeyword: ''
    });

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setFormData({
        //     ...formData,
        //     [name]: value
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        // Insert data into Supabase
        const { data, error } = await supabase
            .from('test2') // Replace with your actual table name
            .insert([{ hello: "this is my second entry " }]).select();


        if (error) {
            console.error('Error inserting data:', error);
        } else {
            console.log('Data inserted:', data);
        }

        // Reset form data
        setFormData({
            eventName: '',
            eventTime: '',
            eventLocation: '',
            eventKeyword: '',
        });
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
                            <input name="eventName" value={formData.eventName} onChange={handleChange} className="input-field" />
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
                            <input name="eventLocation" value={formData.eventLocation} onChange={handleChange} className="input-field" />
                        </p>

                        <p className="w-full py-1">
                            Keyword
                            <input name="eventKeyword" value={formData.eventKeyword} onChange={handleChange} className="input-field" />
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
                                <label> Allow early check-in (30min before event).</label>
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