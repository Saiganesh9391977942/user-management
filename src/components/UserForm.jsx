// UserForm component — modal form for Add and Edit operations
// TODO: implement full UI

import { useState, useEffect } from 'react';
import { validateUserForm, hasErrors } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

const UserForm = ({ isOpen, editUser, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Pre-populate form in Edit mode
  useEffect(() => {
    if (editUser) {
      setFormData({
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        department: editUser.department,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
    setSubmitError(null);
  }, [editUser, isOpen]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <h2>{editUser ? 'Edit User' : 'Add New User'}</h2>
      {submitError && <p style={{ color: 'red' }}>{submitError}</p>}
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>First Name</label>
          <input
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
          {errors.firstName && <span>{errors.firstName}</span>}
        </div>
        <div>
          <label>Last Name</label>
          <input
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
          {errors.lastName && <span>{errors.lastName}</span>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Department</label>
          <select
            value={formData.department}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.department && <span>{errors.department}</span>}
        </div>
        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : editUser ? 'Update User' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
