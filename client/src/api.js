export const BASE_URL = import.meta.env.VITE_API_URL || "https://threemtt-capstone.onrender.com";
if (!import.meta.env.VITE_API_URL) console.warn("\u26A0\uFE0F VITE_API_URL missing, using Render fallback.");
