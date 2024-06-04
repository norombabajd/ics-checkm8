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

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
