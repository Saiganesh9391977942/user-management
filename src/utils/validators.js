// ─── Form Validation ──────────────────────────────────────────────────────────

/**
 * Validates user form data.
 * @param {Object} data - { firstName, lastName, email, department }
 * @returns {Object} errors - keyed by field name
 */
export const validateUserForm = (data) => {
  const errors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First Name is required.';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First Name must be at least 2 characters.';
  }

  if (!data.lastName.trim()) {
    errors.lastName = 'Last Name is required.';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last Name must be at least 2 characters.';
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.department.trim()) {
    errors.department = 'Department is required.';
  }

  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;
