import axios from "axios";

const API = axios.create({
  baseURL: "https://verifycart.onrender.com/api",
  withCredentials: true,
});

export const submitKycDocument = async (type, file) => {
  const data = new FormData();
  data.append("document", file);

  const response = await API.post(
    `/vendor/verification/${type}`,
    data
  );

  return response.data;
};
