import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { mapApiUserToUser } from '../utils/helpers';

// ─── useUsers Custom Hook ─────────────────────────────────────────────────────

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch all users ────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUsers();
      // Map raw JSONPlaceholder shape → { id, firstName, lastName, email, department }
      const mapped = response.data.map(mapApiUserToUser);
      setUsers(mapped);
    } catch (err) {
      setError(err.message || 'Failed to load users. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Add user ───────────────────────────────────────────────────────────────
  const addUser = useCallback(async (formData) => {
    try {
      const response = await createUser(formData);
      // JSONPlaceholder always returns id: 11 — use Date.now() for a truly unique local ID
      // We keep response.data fields (firstName, lastName, etc.) but override the id
      const newUser = {
        ...response.data,  // merge API response fields
        ...formData,       // our local form data takes precedence
        id: Date.now(),    // unique local id — overrides JSONPlaceholder's id: 11
      };
      setUsers((prev) => [newUser, ...prev]);
    } catch (err) {
      throw new Error(err.message || 'Failed to add user. Please try again.');
    }
  }, []);

  // ── Edit user ──────────────────────────────────────────────────────────────
  const editUser = useCallback(async (id, formData) => {
    try {
      await updateUser(id, formData);
      // JSONPlaceholder confirms the PUT but doesn't persist — update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...formData } : u))
      );
    } catch (err) {
      throw new Error(err.message || 'Failed to update user. Please try again.');
    }
  }, []);

  // ── Remove user ────────────────────────────────────────────────────────────
  const removeUser = useCallback(async (id) => {
    try {
      await deleteUser(id);
      // JSONPlaceholder confirms the DELETE — filter out from local state
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete user. Please try again.');
    }
  }, []);

  return { users, loading, error, fetchUsers, addUser, editUser, removeUser };
};
