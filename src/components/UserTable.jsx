import UserRow from './UserRow';

const COLUMNS = [
  { label: '', field: 'id', sortable: true, width: 'w-14' },
  { label: 'User', field: 'firstName', sortable: true, width: 'min-w-[160px]' },
  { label: 'Email', field: 'email', sortable: true, width: 'min-w-[200px]', hidden: 'hidden sm:table-cell' },
  { label: 'Department', field: 'department', sortable: true, width: 'min-w-[140px]', hidden: 'hidden md:table-cell' },
  { label: 'Actions', field: null, sortable: false, width: 'w-24' },
];

// ── Skeleton loader ─────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className="border-b border-slate-800/60">
    <td className="px-4 py-3.5"><div className="skeleton h-3.5 w-8 rounded" /></td>
    <td className="px-4 py-3.5">
      <div className="flex items-center gap-3">
        <div className="skeleton h-8 w-8 rounded-full" />
        <div className="skeleton h-3.5 w-28 rounded" />
      </div>
    </td>
    <td className="px-4 py-3.5 hidden sm:table-cell"><div className="skeleton h-3.5 w-40 rounded" /></td>
    <td className="px-4 py-3.5 hidden md:table-cell"><div className="skeleton h-5 w-20 rounded-full" /></td>
    <td className="px-4 py-3.5"><div className="skeleton h-7 w-16 rounded-lg" /></td>
  </tr>
);

const SortIcon = ({ field, sort }) => {
  if (sort.field !== field) {
    return (
      <svg className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  return sort.order === 'asc' ? (
    <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  ) : (
    <svg className="w-3.5 h-3.5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
    </svg>
  );
};

const UserTable = ({ users, sort, onSort, onEdit, onDelete, loading }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      {/* ── Head ─────────────────────────────────────────────────────── */}
      <thead>
        <tr className="border-b border-slate-700/60 bg-slate-800/40">
          {COLUMNS.map(({ label, field, sortable, width, hidden }) => (
            <th
              key={label}
              onClick={sortable ? () => onSort(field) : undefined}
              className={`
                px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider
                ${width} ${hidden ?? ''}
                ${sortable ? 'cursor-pointer select-none group hover:text-slate-200 transition-colors' : ''}
              `}
            >
              <div className="flex items-center gap-1.5">
                {label}
                {sortable && <SortIcon field={field} sort={sort} />}
              </div>
            </th>
          ))}
        </tr>
      </thead>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <tbody>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
        ) : users.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center py-20">
              <div className="flex flex-col items-center gap-3 text-slate-500">
                <svg className="w-12 h-12 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm font-medium">No users found</p>
                <p className="text-xs">Try adjusting your search or filter criteria</p>
              </div>
            </td>
          </tr>
        ) : (
          users.map((user, i) => (
            <UserRow key={user.id} user={user} index={i} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default UserTable;
