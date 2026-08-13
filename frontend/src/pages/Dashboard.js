import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-2xl font-black mb-2">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="text-indigo-100 text-sm">Manage your campus activities, room bookings, and complaints from here.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/book-room" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Room Booking</h2>
            <p className="text-xs text-slate-500">Book campus seminar halls or meeting rooms easily.</p>
          </Link>

          <Link to="/complaints" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Raise Complaint</h2>
            <p className="text-xs text-slate-500">Report maintenance issues or grievances directly.</p>
          </Link>

          <Link to="/lost-found" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition space-y-2">
            <h2 className="text-lg font-bold text-slate-900">Lost & Found</h2>
            <p className="text-xs text-slate-500">Check items lost or found around the campus.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;