const Header = ({ onAddUser }) => (
  <div className="mb-8 animate-fadeIn">
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

      {/* ── Page Title ────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          User Management
        </h1>
        <p className="mt-1.5 text-slate-400 text-sm max-w-md">
          View, add, edit, and delete team members. All changes are synced with the API in real time.
        </p>
      </div>

      {/* ── Add User CTA ──────────────────────────────────────────────── */}
      <button
        onClick={onAddUser}
        id="add-user-btn"
        className="group inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 active:scale-95 flex-shrink-0"
      >
        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
        </svg>
        Add New User
      </button>

    </div>
  </div>
);

export default Header;
