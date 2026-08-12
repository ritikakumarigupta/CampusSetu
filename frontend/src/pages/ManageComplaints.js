import React, { useState, useEffect } from 'react';
import API from '../api/axios';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/complaints')
      .then((res) => {
        setComplaints(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching complaints:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#070b14] p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADING FIX: Light mode me Dark Slate, Dark mode me Pure White */}
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">
          Manage Student Complaints
        </h1>

        {/* TABLE CONTAINER: Dark mode ke liye background aur border fix */}
        <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-lg transition-colors">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              
              {/* TABLE HEADER */}
              <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Title & Location</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-800 dark:text-slate-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 dark:text-slate-400">
                      Loading complaints...
                    </td>
                  </tr>
                ) : complaints && complaints.length > 0 ? (
                  complaints.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                      <td className="p-4 font-medium text-slate-900 dark:text-white">
                        {item.studentName || item.user?.name || 'N/A'}
                      </td>
                      <td className="p-4 text-sky-600 dark:text-sky-400 font-semibold">
                        {item.category}
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{item.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">📍 {item.location || 'N/A'}</div>
                      </td>
                      <td className="p-4">
                        <input
                          type="text"
                          placeholder="Unassigned"
                          defaultValue={item.assignedTo || ''}
                          className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </td>
                      <td className="p-4">
                        <select 
                          defaultValue={item.status || 'Pending'}
                          className="px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                          <option value="Pending" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Pending</option>
                          <option value="In Progress" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">In Progress</option>
                          <option value="Resolved" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">Resolved</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button className="text-xs text-sky-600 dark:text-sky-400 hover:underline font-semibold">
                          View Image
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-slate-500 dark:text-slate-400">
                      No complaints found.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageComplaints;