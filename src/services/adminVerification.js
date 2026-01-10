import API from "./api";

export const getAllVerifications = async () => {
  const res = await API.get("/admin/verification");
  return res.data?.items || [];
};

export const getPendingVerifications = async () => {
  const res = await API.get("/admin/verification/pending");
  return res.data?.items || [];
};

export const getVerifiedVendors = async () => {
  const res = await API.get("/admin/vendors/approved");
  return res.data || [];
};

export const getRejectedVendors = async () => {
  const res = await API.get("/admin/vendors/rejected");
  return res.data || [];
};

export const reviewVerification = async (id, decision) => {
  return API.patch(`/admin/verification/${id}`, {
    status: decision,
  });
};
