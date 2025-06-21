import axios from "axios";
export const BASE_URL =
  import.meta.env.VITE_API_URL || "https://threemtt-capstone.onrender.com";
export const api = axios.create({ baseURL: BASE_URL });
