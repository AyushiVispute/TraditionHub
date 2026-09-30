import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;

// If you already have a shared axios instance in another service file
// (e.g. placeApi.js), delete the `api` block above and import that one
// instead, so every request carries the same auth headers/interceptors.

// ---- Public / tourist-facing ----

export const getTois = () => api.get('/tois').then((r) => r.data);

export const getPreferences = () => api.get('/preferences').then((r) => r.data);

export const setPreferences = (toiPreferences) =>
  api.put('/preferences', { toiPreferences }).then((r) => r.data);

export const getRecommendations = (limit = 20) =>
  api.get(`/recommendations?limit=${limit}`).then((r) => r.data);

// ---- Admin only (requires adminAuth-protected session) ----

export const adminCreateToi = (payload) =>
  api.post('/tois/admin', payload).then((r) => r.data);

export const adminUpdateToi = (id, payload) =>
  api.put(`/tois/admin/${id}`, payload).then((r) => r.data);

export const adminDeactivateToi = (id) =>
  api.delete(`/tois/admin/${id}`).then((r) => r.data);

export const adminRescoreAll = () =>
  api.post('/tois/admin/rescore-all').then((r) => r.data);