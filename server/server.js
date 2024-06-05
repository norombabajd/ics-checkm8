const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = 4000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = 'https://rpnukhbkfykwutyntnkw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4'
const supabase = createClient(supabaseUrl, supabaseKey)

// Endpoint to delete an event
app.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { data, error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);
        if (error) {
            throw error;
        }
        res.status(200).json({ message: 'Event deleted', data });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error: error.message });
    }
});



//Add Event to events in supabase
app.post('/api/events', async (req, res) => {
    const eventData = req.body;

    try {
        const { data, error } = await supabase
            .from('events')
            .insert(eventData)
            .select();
        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Event created', data });
    } catch (error) {
        res.status(500).json({ message: 'Error creating event', error: error.message });
    }
});
//Add Attendee to attendee in supabase

app.post('/api/attendee', async (req, res) => {
    const formData = req.body;
    try {
        const { data, error } = await supabase
            .from('attendee')
            .insert(formData)
            .select();
        if (error) {
            throw error;
        }

        res.status(200).json({ message: 'Attendee Added', data });
    } catch (error) {
        res.status(500).json({ message: 'Error Adding Attendee', error: error.message });
    }
});


//Retrieves longitude and latitude from supabase
app.post('/location', async (req, res) => {
  const { id, name, password } = req.body;

  try {
    const { data, error } = await supabase
      .from('events')
      .select('latitude, longitude')
      .eq('id', id)
      .eq('name', name)
      .eq('keyword', password)
      .single();

    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Geocoding using geocode api : openrouteservice
const geocode = async (location) => {
    const address = location;
    console.log(address)
    const apiKey = '5b3ce3597851110001cf6248cc4f90bfc3004a36ba42040bc0461132';
    const apiUrl = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const location = data.features[0].geometry;
        return [location.coordinates[1], location.coordinates[0]];
    } catch (error) {
        console.error('Error fetching geocode:', error);
        return [0, 0]; 
    }
};

app.post('/geocode', async (req, res) => {
    const { location } = req.body;
    try {
        const coordinates = await geocode(location);
        res.json({ coordinates });
    } catch (error) {
        console.error('Error in geocoding:', error);
        res.status(500).json({ error: 'Error in geocoding' });
    }
});




//App Listening port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
