import { Navigate } from "react-router-dom";

export default function ProtectedVendorRoute({ children }) {
  const role = localStorage.getItem("role");
  // const token = localStorage.getItem("token");

 if (role !== "vendor") {
  return <Navigate to="/login" replace />;
}


  return children;
}
