import React, { useState } from 'react';
import API from '../api/axios';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

const BookRoom = () => {
  const [formData, setFormData] = useState({ roomName: '', date: '', timeSlot: '', reason: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/bookings', formData)
      .then(() => setMessage('Booking request submitted successfully!'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md transition-colors">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Calendar className="w-7 h-7 text-sky-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Book Lab / Classroom</h1>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>{message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Room / Lab Name</label>
            <input
              type="text"
              required
              placeholder="e.g. CS Lab 2, Seminar Hall 1"
              value={formData.roomName}
              onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
              <input
                type="text"
                required
                placeholder="e.g. 10:00 AM - 12:00 PM"
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Purpose / Reason</label>
            <textarea
              rows="3"
              required
              placeholder="State the reason for booking..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookRoom;