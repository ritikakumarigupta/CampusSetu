import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get('/admin/bookings')
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
        Manage Lab & Room Bookings
      </h1>

      {/* Table Box */}
      <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-md transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Room Name</th>
                <th className="p-4">Booked By</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Reason</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500 dark:text-slate-400">
                    No booking requests found.
                  </td>
                </tr>
              ) : (
                bookings.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="p-4 font-bold text-slate-900 dark:text-white">{item.roomName}</td>
                    <td className="p-4">{item.user?.name || 'Student'}</td>
                    <td className="p-4">{item.date} | {item.timeSlot}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-300">{item.reason}</td>
                    <td className="p-4">
                      <select className="px-3 py-1.5 text-xs rounded-md bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none">
                        <option value="Pending" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Pending</option>
                        <option value="Approved" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Approved</option>
                        <option value="Rejected" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;