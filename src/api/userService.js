import axios from 'axios';
import { API_URL } from '../utils/constants';

// ─── Axios Instance ───────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// ─── Request Interceptor (logging) ────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor (error normalisation) ───────────────────────────────

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred.';
    console.error('[API Error]', message);
    return Promise.reject(new Error(message));
  }
);

// ─── API Methods ──────────────────────────────────────────────────────────────

/** Fetch all users from JSONPlaceholder */
export const getUsers = () => apiClient.get('/');

/** Create a new user (simulated — JSONPlaceholder returns 201 but doesn't persist) */
export const createUser = (user) => apiClient.post('/', user);

/** Update an existing user by ID */
export const updateUser = (id, user) => apiClient.put(`/${id}`, user);

/** Delete a user by ID */
export const deleteUser = (id) => apiClient.delete(`/${id}`);
