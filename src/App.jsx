import { useState, useMemo } from 'react';
import { useUsers } from './hooks/useUsers';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPopup from './components/FilterPopup';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import Pagination from './components/Pagination';
import { paginateArray, getTotalPages } from './utils/helpers';

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_FILTERS = { firstName: '', lastName: '', email: '', department: '' };
const DEFAULT_SORT    = { field: 'id', order: 'asc' };

function App() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();

  // ── Search & Filter ───────────────────────────────────────────────────────
  const [searchQuery,    setSearchQuery]    = useState('');
  const [filters,        setFilters]        = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [filterOpen,     setFilterOpen]     = useState(false);

  // ── Sort ──────────────────────────────────────────────────────────────────
  const [sort, setSort] = useState(DEFAULT_SORT);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize,    setPageSize]    = useState(10);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [formOpen,     setFormOpen]     = useState(false);
  const [userToEdit,   setUserToEdit]   = useState(null);
  const [deleteOpen,   setDeleteOpen]   = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting,     setDeleting]     = useState(false);

  // ── Derived state: search → filter → sort → paginate ─────────────────────
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Global search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q)  ||
          u.email.toLowerCase().includes(q)     ||
          u.department.toLowerCase().includes(q)
      );
    }

    // Field-specific filters
    if (appliedFilters.firstName)
      result = result.filter((u) => u.firstName.toLowerCase().includes(appliedFilters.firstName.toLowerCase()));
    if (appliedFilters.lastName)
      result = result.filter((u) => u.lastName.toLowerCase().includes(appliedFilters.lastName.toLowerCase()));
    if (appliedFilters.email)
      result = result.filter((u) => u.email.toLowerCase().includes(appliedFilters.email.toLowerCase()));
    if (appliedFilters.department)
      result = result.filter((u) => u.department.toLowerCase().includes(appliedFilters.department.toLowerCase()));

    // Sort
    result.sort((a, b) => {
      const av = String(a[sort.field]).toLowerCase();
      const bv = String(b[sort.field]).toLowerCase();
      return sort.order === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

    return result;
  }, [users, searchQuery, appliedFilters, sort]);

  const totalPages   = getTotalPages(processedUsers.length, pageSize);
  const visibleUsers = paginateArray(processedUsers, currentPage, pageSize);

  // Active filter count
  const activeFilterCount = Object.values(appliedFilters).filter(Boolean).length;

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSort = (field) => {
    setSort((prev) => ({ field, order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc' }));
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => { setSearchQuery(value); setCurrentPage(1); };
  const handlePageSizeChange = (size) => { setPageSize(size); setCurrentPage(1); };

  const handleAddUser  = () => { setUserToEdit(null); setFormOpen(true); };
  const handleEditUser = (user) => { setUserToEdit(user); setFormOpen(true); };
  const handleDeleteUser = (user) => { setUserToDelete(user); setDeleteOpen(true); };

  const handleFormSubmit = async (data) => {
    if (userToEdit) await editUser(userToEdit.id, data);
    else            await addUser(data);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await removeUser(userToDelete.id);
      setDeleteOpen(false);
      setUserToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const handleApplyFilters = () => { setAppliedFilters(filters); setCurrentPage(1); setFilterOpen(false); };
  const handleResetFilters  = () => { setFilters(DEFAULT_FILTERS); setAppliedFilters(DEFAULT_FILTERS); setCurrentPage(1); };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">

        {/* API error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-sm animate-fadeIn">
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Page header + stats */}
        <Header onAddUser={handleAddUser} />

        {/* ── Table Card ───────────────────────────────────────────────── */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3.5 border-b border-slate-700/50 bg-slate-900/80">
            {/* Search */}
            <div className="w-full sm:max-w-xs">
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </div>

            {/* Right toolbar actions */}
            <div className="flex items-center gap-2 sm:ml-auto">
              {/* Result count */}
              {!loading && (
                <span className="text-xs text-slate-500 hidden sm:block">
                  {processedUsers.length} result{processedUsers.length !== 1 ? 's' : ''}
                </span>
              )}

              {/* Filter button */}
              <button
                id="filter-btn"
                onClick={() => setFilterOpen(true)}
                className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  activeFilterCount > 0
                    ? 'bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white hover:border-slate-600'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-violet-500 text-white text-xs font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort indicator */}
              {sort.field !== 'id' && (
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-slate-400 bg-slate-800 border border-slate-700">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m4 4l-4-4" />
                  </svg>
                  {sort.field} {sort.order === 'asc' ? '↑' : '↓'}
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <UserTable
            users={visibleUsers}
            sort={sort}
            onSort={handleSort}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            loading={loading}
          />

          {/* Pagination */}
          {!loading && (
            <div className="px-4 py-3.5 border-t border-slate-700/50 bg-slate-900/50">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={processedUsers.length}
                onPageChange={setCurrentPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          )}
        </div>

      </main>



      {/* ── Modals (portalled to root) ────────────────────────────────── */}
      <FilterPopup
        isOpen={filterOpen}
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onClose={() => setFilterOpen(false)}
      />
      <UserForm
        isOpen={formOpen}
        editUser={userToEdit}
        onSubmit={handleFormSubmit}
        onClose={() => setFormOpen(false)}
      />
      <ConfirmDelete
        isOpen={deleteOpen}
        user={userToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => { setDeleteOpen(false); setUserToDelete(null); }}
        deleting={deleting}
      />
    </div>
  );
}

export default App;
