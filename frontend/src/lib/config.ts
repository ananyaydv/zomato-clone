// Central place for the backend URL.
// Locally it falls back to your local backend (localhost:8001).
// On a deployed site (Vercel/Netlify), set the VITE_API_URL environment
// variable to your deployed backend's URL, e.g. https://your-backend.onrender.com
const RAW_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

// Remove any trailing slash so we don't end up with double slashes.
export const SERVER_URL = RAW_BASE_URL.replace(/\/$/, '');

// Most backend routes are mounted under /api
export const API_URL = `${SERVER_URL}/api`;