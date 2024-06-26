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
async function deleteRowsByEventId(eventId) {
  try {
    const { data, error } = await supabase
      .from('attendee') // Replace with your table name
      .delete()
      .eq('eventID', eventId); // Replace 'eventid' with the actual column name

    if (error) {
      throw error;
    }

    console.log('Rows deleted:', data);
  } catch (error) {
    console.error('Error deleting rows:', error.message);
  }
}

//Delete event api call. deletes in supabase
app.delete('/api/events/:id', async (req, res) => {
    const { id } = req.params;
    deleteRowsByEventId(id)
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

//Delete Attendee from attendance list
async function deleteAttendee(eventId, userId) {
  try {
    const { data, error } = await supabase
      .from('attendee') // Replace with your table name if different
      .delete()
      .eq('eventID', eventId) // Replace 'eventID' with the actual column name if different
      .eq('userID', userId); // Replace 'userID' with the actual column name if different

    if (error) {
      throw error;
    }

    console.log('Attendee deleted:', data);
  } catch (error) {
    console.error('Error deleting attendee:', error.message);
  }
}

// Delete endpoint for attendees
app.delete('/api/attendees/:eventId/:userId', async (req, res) => {
  const { eventId, userId } = req.params;
  console.log(eventId,userId)
  try {
    // Delete the specific attendee from the 'attendee' table
    await deleteAttendee(eventId, userId);

    res.status(200).json({ message: 'Attendee deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendee', error: error.message });
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
app.post('/api/addAttendee', async (req, res) => {
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

//Get user events from supabase
app.get('/api/user-events', async (req, res) => {
  try {
    const val = req.headers.uuid;
   
    const { createdEvents, createdErr } = await supabase
      .from('events')
      .select()
      .eq('creator', val);

    if (error) {
      throw new Error(error.message);
    } else {
      res.json(events);
    }
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//post new users
app.post('/api/users', async (req, res) => {
  try {
    const userData = req.body; // Extract user data from req.body
    console.log("this is the",userData.fullName, userData.id, userData.email);

   const { data1, error1 } = await supabase
  .from('users-demographics')
  .select('*')
  .eq('id', userData.id) 
  .single();

if (!data1) {
  const fullName = userData.fullName; // Assuming fullName is properly formatted
  const firstSpaceIndex = fullName.indexOf(' ');
  const first_name = fullName.substring(0, firstSpaceIndex).trim(); // Extracts the first word
  const last_name = fullName.substring(firstSpaceIndex + 1).trim(); // Extracts the remaining words
  // Data doesn't exist, so insert it
  const { data, error } = await supabase
    .from('user-demographics')
    .insert({ id: userData.id, first_name, last_name, email: userData.email })
    .single();

  if (error1 || error) {
    console.error('Error inserting data:', error1, error);
  } else {
    console.log('Data inserted:', data1, data);
  }
} else {
  console.log('Data already exists:', data1);
}

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.log(error)
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Get user events from supabase


function formatTimestamp(timestamp) {
  const dateObj = new Date(timestamp);
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
}

app.get('/api/attendees', async (req, res) => {
  try {
    const eventID = req.headers.event;

    // First query: Fetch attendees with the specified event ID, including the date
    const { data: attendees, error: attendeeError } = await supabase
      .from('attendee')
      .select('userID, date') // Ensure to select the userID and date
      .eq('eventID', eventID);

    if (attendeeError) {
      throw new Error(attendeeError.message);
    }

    // Extract the attendee IDs
    const attendeeIDs = attendees.map(att => att.userID);

    if (attendeeIDs.length === 0) {
      return res.json([]); // No attendees found
    }

    // Second query: Fetch names of the attendees from another table using their IDs
    const { data: names, error: namesError } = await supabase
      .from('user-demographics') // Assuming 'user-demographics' is the table where names are stored
      .select('id, first_name, last_name, email') // Adjust the columns as per your table schema
      .in('id', attendeeIDs);

    if (namesError) {
      throw new Error(namesError.message);
    }

    // Combine the attendee information with their names and dates
    const result = attendees.map(att => {
      const user = names.find(name => name.id === att.userID);
      return {
        userID: att.userID,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        date: formatTimestamp(att.date)
      };
    });
    console.log(result)
    res.json(result);
  } catch (error) {
    console.error('Error fetching events:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});







//App Listening port
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
