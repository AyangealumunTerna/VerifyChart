import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
