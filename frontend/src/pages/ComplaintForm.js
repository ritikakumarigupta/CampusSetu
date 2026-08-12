import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { AlertTriangle, Send } from 'lucide-react';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({ title: '', category: 'Maintenance', description: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/complaints', formData)
      .then(() => navigate('/my-complaints'))
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md transition-colors">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <AlertTriangle className="w-7 h-7 text-amber-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Raise Maintenance Complaint</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Issue Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Water Leakage in Room 204"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            >
              <option value="Maintenance">Maintenance / Hostel</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="IT / Lab Equipment">IT / Lab Equipment</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows="4"
              required
              placeholder="Describe your issue in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 rounded-xl transition shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Submit Complaint</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;