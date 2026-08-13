import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await API.get('/api/complaints');
        setComplaints(res.data);
      } catch (err) {
        console.error('Error fetching complaints', err);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-black text-slate-900">Manage Complaints</h1>
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c._id} className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">{c.title} ({c.category})</h3>
                <p className="text-xs text-slate-500">{c.description}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-600 rounded-full">{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageComplaints;