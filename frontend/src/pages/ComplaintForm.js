import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({ title: '', category: 'Maintenance', description: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await API.post('/api/complaints', formData);
      setMessage('Complaint raised successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to submit complaint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
          <h1 className="text-2xl font-black text-slate-900 text-center">Raise a Complaint</h1>

          {message && (
            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs text-center font-medium">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="Water cooler leakage"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="Maintenance">Maintenance</option>
                <option value="Hostel">Hostel</option>
                <option value="IT/Wi-Fi">IT/Wi-Fi</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                required
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition shadow-md text-sm mt-2"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ComplaintForm;