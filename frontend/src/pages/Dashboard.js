import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { Megaphone, AlertTriangle, Calendar, Search, MapPin, Mail, PhoneCall, Shield } from 'lucide-react';

const Dashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get('/admin/announcements')
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* 1. Welcome Banner Card */}
      <div className="bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-800 rounded-2xl p-6 text-white shadow-lg border border-sky-500/20">
        <h1 className="text-3xl font-extrabold">Welcome back, {user?.name}!</h1>
        <p className="mt-1 text-sky-100">Roll/ID: <span className="font-mono font-bold text-white">{user?.rollNo}</span> | Campus Digital Portal</p>
      </div>

      {/* 2. Action Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/new-complaint" className="bg-white dark:bg-[#0e1626] p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition group">
          <AlertTriangle className="w-8 h-8 text-amber-500 mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-sky-500">Raise Maintenance Complaint</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Report plumbing, electrical or hostel issues with photo proof.</p>
        </Link>

        <Link to="/book-room" className="bg-white dark:bg-[#0e1626] p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition group">
          <Calendar className="w-8 h-8 text-sky-500 mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-sky-500">Book Lab / Classroom</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Check availability and request room approvals instantly.</p>
        </Link>

        <Link to="/lost-found" className="bg-white dark:bg-[#0e1626] p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 hover:border-sky-500 transition group">
          <Search className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition" />
          <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100 group-hover:text-sky-500">Lost & Found Portal</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Post lost belongings or return items found on campus.</p>
        </Link>
      </div>

      {/* 3. Announcements Card Container */}
      <div className="bg-white dark:bg-[#0e1626] p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <Megaphone className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Campus Announcements</h2>
        </div>

        {announcements.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 text-sm">No announcements posted yet.</p>
        ) : (
          <div className="space-y-4">
            {announcements.map((item) => (
              <div key={item._id} className="p-4 bg-slate-50 dark:bg-slate-900/80 rounded-lg border-l-4 border-sky-500">
                <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{item.description}</p>
                <span className="text-xs text-slate-400 mt-2 block">
                  Posted on {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Helpline Section Card Container */}
      <div className="bg-white dark:bg-[#0e1626] p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Campus Helpline & Support</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Direct contact lines for campus support.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-pink-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Main Office</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Admin Block, Room 102</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
            <Mail className="w-5 h-5 text-sky-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email Support</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">support@campussetu.edu</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center space-x-3">
            <PhoneCall className="w-5 h-5 text-emerald-500" />
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Emergency Contact</p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;