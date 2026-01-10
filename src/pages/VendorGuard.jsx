import { Navigate } from "react-router-dom";

const VendorGuard = ({ allowed, children }) => {
  const role = localStorage.getItem("role");
  const kycStatus = localStorage.getItem("vendorStatus"); 
  // 👆 must be saved on login

  // Not logged in or not vendor
  if (!role || role !== "vendor") {
    return <Navigate to="/login" replace />;
  }

  // If status not yet available, avoid blank screen
  if (!kycStatus) {
    return <Navigate to="/login" replace />;
  }

  // If status not allowed on this route
  if (!allowed.includes(kycStatus)) {
    switch (kycStatus) {
      case "NOT_SUBMITTED":
      case "REJECTED":
        return <Navigate to="/kyc" replace />;

      case "PENDING":
        return <Navigate to="/kyc-pending" replace />;

      case "APPROVED":
        return <Navigate to="/vendor/profile" replace />;

      default:
        return <Navigate to="/login" replace />;
    }
  }

  // ✅ THIS LINE PREVENTS BLANK PAGE
  return children;
};

export default VendorGuard;
