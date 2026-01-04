import axios from "axios";

const API = axios.create({
  baseURL: "https://verifycart.onrender.com/api",
});

export const registerVendor = async (payload) => {
  const response = await API.post("/auth/vendor/register", payload);
  return response.data;
};

export const loginVendor = async (data) => {
  const res = await axios.post(
    "https://verifycart.onrender.com/api/auth/vendor/login",
    data,
    { withCredentials: true } // 👈 REQUIRED
  );
  return res.data;
};
