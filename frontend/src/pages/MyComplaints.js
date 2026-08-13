import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';

const MyComplaints = () => {
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
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-4">
        <h1 className="text-xl font-black text-slate-900">My Complaints</h1>
        <div className="space-y-3">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">{c.title}</h3>
                <p className="text-xs text-slate-500">{c.description}</p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">{c.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;