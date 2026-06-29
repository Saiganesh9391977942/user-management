import { DEFAULT_DEPARTMENT, DEPARTMENTS } from './constants';

// ─── API Data Mapping ─────────────────────────────────────────────────────────

/**
 * Maps a raw JSONPlaceholder user object to our internal User shape.
 * Assumption: `name` is split on the first space into firstName + lastName.
 * Assumption: `company.name` is used as the department; falls back to DEFAULT_DEPARTMENT.
 * @param {Object} apiUser - raw user from JSONPlaceholder
 * @param {number} index - index in the array (used for department rotation)
 * @returns {{ id, firstName, lastName, email, department }}
 */
export const mapApiUserToUser = (apiUser, index) => {
  const nameParts = String(apiUser.name).trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const department =
    apiUser.company?.name ||
    DEPARTMENTS[index % DEPARTMENTS.length] ||
    DEFAULT_DEPARTMENT;

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email,
    department,
  };
};

// ─── Pagination Helper ────────────────────────────────────────────────────────

export const paginateArray = (items, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

export const getTotalPages = (totalItems, pageSize) =>
  Math.ceil(totalItems / pageSize);

// ─── String Helpers ───────────────────────────────────────────────────────────

export const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const getFullName = (user) =>
  `${user.firstName} ${user.lastName}`.trim();
