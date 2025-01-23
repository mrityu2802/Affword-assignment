import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BE_BASE_URL,
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
  },
});
