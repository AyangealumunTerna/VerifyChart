import { Navigate } from "react-router-dom";

export default function ProtectedVendorRoute({ children }) {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("vendorToken");
  const status = localStorage.getItem("vendorStatus");

  if (!token || role !== "vendor") {
    return <Navigate to="/login" replace />;
  }

  if (status !== "VERIFIED") {
    return <Navigate to="/kyc-pending" replace />;
  }

  return children;
}
