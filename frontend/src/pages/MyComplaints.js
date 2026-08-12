import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { PlusCircle, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get('/complaints/my')
      .then(res => setComplaints(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      
      {/* HEADER SECTION (Text visibility fix for dark mode) */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
            My Maintenance Complaints
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track and check status of your submitted issues.
          </p>
        </div>

        <Link
          to="/new-complaint"
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md transition"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Raise Complaint</span>
        </Link>
      </div>

      {/* COMPLAINTS CONTAINER (Card & empty state visibility fix) */}
      {complaints.length === 0 ? (
        <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-md transition-colors">
          <AlertCircle className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No complaints submitted yet.
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            If you face any issues in hostel or labs, click "Raise Complaint" above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complaints.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">
                  {item.title}
                </h3>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  item.status === 'Resolved' 
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                }`}>
                  {item.status || 'Pending'}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {item.description}
              </p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <span>Category: {item.category}</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyComplaints;