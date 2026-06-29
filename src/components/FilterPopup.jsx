import { useState } from 'react';
import { DEPARTMENTS } from '../utils/constants';

const FilterPopup = ({ isOpen, filters, onFilterChange, onApply, onReset, onClose }) => {
  const [local, setLocal] = useState(filters);

  // Sync local state when popup opens
  if (!isOpen) return null;

  const handleChange = (field, value) => {
    const next = { ...local, [field]: value };
    setLocal(next);
  };

  const handleApply = () => {
    onFilterChange(local);
    onApply();
  };

  const handleReset = () => {
    const empty = { firstName: '', lastName: '', email: '', department: '' };
    setLocal(empty);
    onFilterChange(empty);
    onReset();
  };

  const activeCount = Object.values(local).filter(Boolean).length;

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Panel */}
      <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-md animate-slideUp">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Filter Users</h3>
              {activeCount > 0 && (
                <p className="text-xs text-violet-400">{activeCount} filter{activeCount > 1 ? 's' : ''} active</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Fields */}
        <div className="p-6 space-y-4">
          {[
            { id: 'filter-firstName', field: 'firstName', label: 'First Name', placeholder: 'e.g. John' },
            { id: 'filter-lastName',  field: 'lastName',  label: 'Last Name',  placeholder: 'e.g. Doe' },
            { id: 'filter-email',     field: 'email',     label: 'Email',      placeholder: 'e.g. john@example.com' },
          ].map(({ id, field, label, placeholder }) => (
            <div key={field}>
              <label htmlFor={id} className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                {label}
              </label>
              <input
                id={id}
                type="text"
                value={local[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={placeholder}
                className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-600 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
              />
            </div>
          ))}

          {/* Department select */}
          <div>
            <label htmlFor="filter-department" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Department
            </label>
            <select
              id="filter-department"
              value={local.department}
              onChange={(e) => handleChange('department', e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 rounded-lg px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all cursor-pointer"
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-slate-700/50 bg-slate-900/50 rounded-b-2xl">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200"
          >
            Reset All
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20 active:scale-95"
          >
            Apply Filters
            {activeCount > 0 && (
              <span className="ml-2 bg-white/20 text-xs px-1.5 py-0.5 rounded-full">{activeCount}</span>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default FilterPopup;
