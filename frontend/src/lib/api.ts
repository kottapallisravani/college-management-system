// If VITE_API_BASE is provided use it. Otherwise, when running in a browser use the current host
// so the app works when accessed over the network (e.g., http://10.149.163.186:8080).
let inferredBase = 'http://localhost:4000';
if (typeof window !== 'undefined') {
    const proto = window.location.protocol || 'http:';
    const host = window.location.hostname || 'localhost';
    inferredBase = `${proto}//${host}:4000`;
}
export const API_BASE = import.meta.env.VITE_API_BASE || inferredBase;

export const api = {
    post: async (path: string, body?: unknown) => {
        return fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        });
    },
    get: async (path: string) => {
        return fetch(`${API_BASE}${path}`);
    },
    authGet: async (path: string) => {
        const token = localStorage.getItem('token');
        return fetch(`${API_BASE}${path}`, {
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
    },
    authPost: async (path: string, body?: unknown) => {
        const token = localStorage.getItem('token');
        return fetch(`${API_BASE}${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: body ? JSON.stringify(body) : undefined,
        });
    },
    authPut: async (path: string, body?: unknown) => {
        const token = localStorage.getItem('token');
        return fetch(`${API_BASE}${path}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
            body: body ? JSON.stringify(body) : undefined,
        });
    },
    authDelete: async (path: string) => {
        const token = localStorage.getItem('token');
        return fetch(`${API_BASE}${path}`, {
            method: 'DELETE',
            headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        });
    },
};

export default api;
