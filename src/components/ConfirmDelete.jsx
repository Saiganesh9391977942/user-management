const ConfirmDelete = ({ isOpen, user, onConfirm, onCancel, deleting }) => {
  if (!isOpen || !user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={(e) => { if (e.target === e.currentTarget && !deleting) onCancel(); }}
    >
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl w-full max-w-md animate-slideUp overflow-hidden">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-900/25 to-slate-900 border-b border-slate-700/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/15 border border-red-500/25 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Delete User</h2>
              <p className="text-sm text-slate-400">This action is permanent and cannot be undone.</p>
            </div>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <div className="px-6 py-5">
          {/* User preview card */}
          <div className="flex items-center gap-4 p-4 bg-slate-800/60 rounded-xl border border-slate-700/50 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-slate-400">{user.email}</p>
              <p className="text-xs text-slate-500 mt-0.5">{user.department}</p>
            </div>
          </div>

          <p className="text-sm text-slate-400 leading-relaxed">
            You are about to permanently delete{' '}
            <span className="font-semibold text-white">{user.firstName} {user.lastName}</span>.
            This will remove all their data from the system.
          </p>
        </div>

        {/* ── Actions ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-6 py-4 bg-slate-900/50 border-t border-slate-700/50">
          <button
            id="cancel-delete-btn"
            onClick={onCancel}
            disabled={deleting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            id="confirm-delete-btn"
            onClick={onConfirm}
            disabled={deleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 rounded-xl shadow-lg shadow-red-500/20 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {deleting ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Deleting…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Yes, Delete User
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDelete;
