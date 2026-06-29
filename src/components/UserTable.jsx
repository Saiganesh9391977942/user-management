// UserTable component — full grid layout with sortable column headers
// TODO: implement full UI

import UserRow from './UserRow';

const COLUMNS = [
  { label: 'ID',         field: 'id' },
  { label: 'First Name', field: 'firstName' },
  { label: 'Last Name',  field: 'lastName' },
  { label: 'Email',      field: 'email' },
  { label: 'Department', field: 'department' },
];

const UserTable = ({ users, sort, onSort, onEdit, onDelete, loading }) => {
  if (loading) return <p>Loading users...</p>;

  return (
    <table>
      <thead>
        <tr>
          {COLUMNS.map(({ label, field }) => (
            <th key={field} onClick={() => onSort(field)} style={{ cursor: 'pointer' }}>
              {label}
              {sort.field === field ? (sort.order === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan={6}>No users found.</td>
          </tr>
        ) : (
          users.map((user) => (
            <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserTable;
