import { Navigate } from "react-router-dom";

export default function ProtectedVendorRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "vendor") {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
