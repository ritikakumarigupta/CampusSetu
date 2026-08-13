import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/api/bookings');
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings', err);
      }
    };
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-black text-slate-900">Manage Room Bookings</h1>
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">{b.roomName}</h3>
                <p className="text-xs text-slate-500">Date: {b.date} | Slot: {b.timeSlot}</p>
                <p className="text-xs text-slate-400">Purpose: {b.purpose}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-amber-50 text-amber-600 rounded-full">{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;