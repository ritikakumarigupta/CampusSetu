import React, { useEffect, useState } from 'react';
import API from './path-to-your-api-file'; // Jahan upar wala API instance save hai

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/api/bookings') // Yeh automatically live baseURL ('https://campussetu-fk70.onrender.com/api/bookings') par request bhejega
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.log("Error fetching bookings:", error);
      });
  }, []);

  return (
    <div>
      <h2>My Room Bookings</h2>
      {bookings.map((booking, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <p><b>Room:</b> {booking.roomName}</p>
          <p><b>Date:</b> {booking.date}</p>
          <p><b>Time Slot:</b> {booking.timeSlot}</p>
          <p><b>Status:</b> {booking.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;