// Department → badge colour mapping
const DEPT_COLORS = {
  Engineering: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  Marketing: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  Sales: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  HR: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
  Finance: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  IT: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
  Design: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  Operations: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
};

const getDeptColor = (dept) =>
  DEPT_COLORS[dept] || 'bg-slate-500/15 text-slate-300 border-slate-500/30';

// Avatar initials colour based on first letter
const AVATAR_COLORS = [
  'from-violet-400 to-violet-600',
  'from-indigo-400 to-indigo-600',
  'from-sky-400 to-sky-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-amber-600',
  'from-rose-400 to-rose-600',
  'from-cyan-400 to-cyan-600',
];
const getAvatarColor = (name) =>
  AVATAR_COLORS[(name.charCodeAt(0) || 0) % AVATAR_COLORS.length];

const UserRow = ({ user, onEdit, onDelete, index }) => {
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();
  const avatarColor = getAvatarColor(user.firstName || '');

  return (
    <tr className="table-row-hover border-b border-slate-800/60 group">
      {/* ID */}
      <td className="px-4 py-3.5 text-sm text-slate-500 font-mono w-14">
        {String(user.id).padStart(2, '0')}
      </td>

      {/* User (avatar + name) */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md`}>
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
              {user.firstName} {user.lastName}
            </p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-4 py-3.5 hidden sm:table-cell">
        <a
          href={`mailto:${user.email}`}
          className="text-sm text-slate-400 hover:text-violet-300 transition-colors flex items-center gap-1.5 w-fit"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {user.email}
        </a>
      </td>

      {/* Department badge */}
      <td className="px-4 py-3.5 hidden md:table-cell">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getDeptColor(user.department)}`}>
          {user.department}
        </span>
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
          {/* Edit */}
          <button
            id={`edit-user-${user.id}`}
            onClick={() => onEdit(user)}
            title="Edit user"
            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-violet-500/20 text-slate-400 hover:text-violet-300 border border-transparent hover:border-violet-500/30 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>

          {/* Delete */}
          <button
            id={`delete-user-${user.id}`}
            onClick={() => onDelete(user)}
            title="Delete user"
            className="p-1.5 rounded-lg bg-slate-700/50 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-transparent hover:border-red-500/30 transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
