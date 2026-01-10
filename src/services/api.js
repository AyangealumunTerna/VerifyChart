import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  withCredentials: true,
});

// 🔐 Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("vendorToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// export default API;
export default API;
