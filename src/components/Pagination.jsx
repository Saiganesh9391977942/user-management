import { PAGE_SIZE_OPTIONS } from '../utils/constants';

const Pagination = ({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }) => {
  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem   = Math.min(currentPage * pageSize, totalItems);

  // Build visible page numbers (max 5 shown, with ellipsis)
  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, '...', totalPages];
    if (currentPage >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();

  const NavBtn = ({ onClick, disabled, children, title }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all duration-150"
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-1">

      {/* ── Left: info + page size ──────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-slate-400">
          <span className="font-medium text-slate-200">{startItem}–{endItem}</span>
          {' '}of{' '}
          <span className="font-medium text-slate-200">{totalItems}</span>
          {' '}users
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-xs text-slate-500 whitespace-nowrap">Rows per page</label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 cursor-pointer transition-all"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Right: page navigation ──────────────────────────────────── */}
      <div className="flex items-center gap-1">
        <NavBtn onClick={() => onPageChange(1)} disabled={currentPage === 1} title="First page">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </NavBtn>
        <NavBtn onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} title="Previous page">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </NavBtn>

        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-slate-600 text-sm">…</span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 ${
                p === currentPage
                  ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {p}
            </button>
          )
        )}

        <NavBtn onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} title="Next page">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </NavBtn>
        <NavBtn onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages} title="Last page">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </NavBtn>
      </div>

    </div>
  );
};

export default Pagination;
