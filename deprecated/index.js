// index.js - login-screen related functions for checkm8

// https://github.com/supabase/examples-archive/tree/main/supabase-js-v1/auth/javascript-auth
// https://supabase.com/docs/reference/javascript/

/*
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";


export let currenlocation;
let fecthedData;

function current() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      currenlocation = { "Lat": latitude, "Lon": longitude }
    }, function (error) {
      console.error("Error getting geolocation:", error.message);
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function eventLocation() {
  fetch('https://nominatim.openstreetmap.org/search?q=irvine+ca&format=jsonv2')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle the JSON data here
      fecthedData = data
      console.log(data[0].lat, data[0].lon);

    })
    .catch(error => {
      // Handle promise rejection here
      console.error('Fetch error:', error);
    });
}


function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadius = 6371000; // Earth's radius in meters
  const radLat1 = (Math.PI / 180) * lat1;
  const radLat2 = (Math.PI / 180) * lat2;
  const deltaLat = (Math.PI / 180) * (lat2 - lat1);
  const deltaLon = (Math.PI / 180) * (lon2 - lon1);

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) *
    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

function isWithin100Meters(lat1, lon1, lat2, lon2) {
  const distance = calculateDistance(lat1, lon1, lat2, lon2);
  return distance <= 100;
}
var lat1 = fecthedData[0].lat;
var lon1 = fecthedData[0].lon;
var lat2 = currenlocation.Lat;
var lon2 = currenlocation.lon;
// console.log(isWithin100Meters(lat1, lon1, lat2, lon2))


function mainTesting() {

}

// Handle loading, error, and data states in your component's JSX
const supabase = createClient(
  "https://rpnukhbkfykwutyntnkw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbnVraGJrZnlrd3V0eW50bmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQwNzU0MzUsImV4cCI6MjAyOTY1MTQzNX0.c9PQXsg2ADUdpNtyY8_eLmKDpfSr11W4jXdHp0BBQG4",
);
*/

const create = document.getElementById("oauth");

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
create.addEventListener("click", async () => {

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  }) * /

  window.location.href = '/pages/Dashboard/dashboard.html'
});
