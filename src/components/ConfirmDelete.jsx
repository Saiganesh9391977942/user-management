// ConfirmDelete component — safety confirmation modal before deletion
// TODO: implement full UI

const ConfirmDelete = ({ isOpen, user, onConfirm, onCancel, deleting }) => {
  if (!isOpen || !user) return null;

  return (
    <div>
      <h3>Confirm Delete</h3>
      <p>
        Are you sure you want to delete{' '}
        <strong>{user.firstName} {user.lastName}</strong>?
        This action cannot be undone.
      </p>
      <button onClick={onCancel} disabled={deleting}>Cancel</button>
      <button onClick={onConfirm} disabled={deleting}>
        {deleting ? 'Deleting...' : 'Yes, Delete'}
      </button>
    </div>
  );
};

export default ConfirmDelete;
