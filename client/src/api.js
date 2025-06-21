import axios from "axios";

const envUrl = import.meta.env.VITE_API_URL;
const defaultUrl = "https://threemtt-capstone.onrender.com";
export const BASE_URL =
  ((envUrl && !/localhost|127\.0\.0\.1/.test(envUrl) ? envUrl : defaultUrl).replace(/\/+$/, '')) + '/';
export const api = axios.create({ baseURL: BASE_URL });
