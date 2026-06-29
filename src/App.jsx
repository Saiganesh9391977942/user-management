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

// ─── Default State ─────────────────────────────────────────────────────────────
const DEFAULT_FILTERS = { firstName: '', lastName: '', email: '', department: '' };
const DEFAULT_SORT = { field: 'id', order: 'asc' };

function App() {
  const { users, loading, error, addUser, editUser, removeUser } = useUsers();

  // ── Search & Filter ───────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  // ── Sort ──────────────────────────────────────────────────────────────────
  const [sort, setSort] = useState(DEFAULT_SORT);

  // ── Pagination ────────────────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Modals ────────────────────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── Derived: Filter + Search + Sort + Paginate ────────────────────────────
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (u) =>
          u.firstName.toLowerCase().includes(q) ||
          u.lastName.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.department.toLowerCase().includes(q)
      );
    }

    // Filters
    if (appliedFilters.firstName)
      result = result.filter((u) =>
        u.firstName.toLowerCase().includes(appliedFilters.firstName.toLowerCase())
      );
    if (appliedFilters.lastName)
      result = result.filter((u) =>
        u.lastName.toLowerCase().includes(appliedFilters.lastName.toLowerCase())
      );
    if (appliedFilters.email)
      result = result.filter((u) =>
        u.email.toLowerCase().includes(appliedFilters.email.toLowerCase())
      );
    if (appliedFilters.department)
      result = result.filter((u) =>
        u.department.toLowerCase().includes(appliedFilters.department.toLowerCase())
      );

    // Sort
    result.sort((a, b) => {
      const aVal = String(a[sort.field]).toLowerCase();
      const bVal = String(b[sort.field]).toLowerCase();
      return sort.order === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    });

    return result;
  }, [users, searchQuery, appliedFilters, sort]);

  const totalPages = getTotalPages(processedUsers.length, pageSize);
  const visibleUsers = paginateArray(processedUsers, currentPage, pageSize);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSort = (field) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleAddUser = () => {
    setUserToEdit(null);
    setFormOpen(true);
  };

  const handleEditUser = (user) => {
    setUserToEdit(user);
    setFormOpen(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data) => {
    if (userToEdit) {
      await editUser(userToEdit.id, data);
    } else {
      await addUser(data);
    }
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

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      {/* ── Tailwind Test Banner ── remove after confirming ── */}
      <div className="mb-6 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-center shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">✅ Tailwind CSS v4 is Working!</h1>
        <p className="mt-2 text-violet-200">User Management Dashboard</p>
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-3 text-red-300">{error}</p>}

      <Header onAddUser={handleAddUser} />

      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <button onClick={() => setFilterOpen(true)}>Filters</button>

      <FilterPopup
        isOpen={filterOpen}
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onClose={() => setFilterOpen(false)}
      />

      <UserTable
        users={visibleUsers}
        sort={sort}
        onSort={handleSort}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        loading={loading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={processedUsers.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
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
