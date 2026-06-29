// UserRow component — a single row in the user table with action buttons
// TODO: implement full UI

const UserRow = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td>
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
