import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Search, PlusCircle, MapPin, Tag } from 'lucide-react';

const LostFoundPage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/lost-found')
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white transition-colors">
            Lost & Found Portal
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search or report lost and found items on campus.
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center shadow-md transition-colors">
          <Search className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
            No items reported yet.
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Report any misplaced belongings to help fellow students.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white dark:bg-[#0e1626] border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm space-y-3 transition-colors"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{item.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  item.type === 'Lost'
                    ? 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Location: {item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LostFoundPage;