import React, { useState } from 'react';
import API from '../api/axios';
import { Megaphone, Send } from 'lucide-react';

const PostAnnouncement = () => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post('/admin/announcements', formData)
      .then(() => {
        setMsg('Announcement posted successfully!');
        setFormData({ title: '', description: '' });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md transition-colors">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <Megaphone className="w-7 h-7 text-sky-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Post Campus Announcement</h1>
        </div>

        {msg && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs text-center font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Campus Closed on Friday"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea
              rows="4"
              required
              placeholder="Write the details here..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm transition"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl transition shadow-md text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Publish Announcement</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostAnnouncement;