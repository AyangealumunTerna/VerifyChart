import axios from "axios";

const API = axios.create({
  baseURL: "https://verifycart.onrender.com/api",
  withCredentials: true,
});

export const loginAdmin = async (data) => {
  const res = await API.post("/auth/admin/login", data);
  return res.data;
};
