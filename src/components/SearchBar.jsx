const SearchBar = ({ value, onChange }) => (
  <div className="relative flex-1">
    {/* Search icon */}
    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
      <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <input
      id="search-input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name, email, department…"
      className="w-full bg-slate-800/60 border border-slate-700/60 text-slate-100 placeholder-slate-500 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200 hover:border-slate-600"
    />

    {/* Clear button */}
    {value && (
      <button
        onClick={() => onChange('')}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )}
  </div>
);

export default SearchBar;
