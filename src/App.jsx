import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import KYC from "./pages/KYC.jsx";
import KYCPending from "./pages/kycPending";
import Signup from "./components/SignupForm.jsx";
import Home from "./pages/Home";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/admin/Login.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import VendorProfile from "./pages/vendor/VendorProfile";
import EditVendorProfile from "./pages/vendor/EditVendorProfile";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import RequestReset from "./components/RequestReset.jsx";

import VendorGuard from "./pages/VendorGuard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        {/* VENDOR — STATUS AWARE */}
        <Route
          path="/kyc"
          element={
            <VendorGuard allowed={["NOT_SUBMITTED", "REJECTED"]}>
              <KYC />
            </VendorGuard>
          }
        />

        <Route
          path="/kyc-pending"
          element={
            <VendorGuard allowed={["PENDING"]}>
              <KYCPending />
            </VendorGuard>
          }
        />

        <Route
          path="/vendor/profile"
          element={
            <VendorGuard allowed={["APPROVED"]}>
              <VendorProfile />
            </VendorGuard>
          }
        />

        <Route
          path="/vendor/edit-profile"
          element={
            <VendorGuard allowed={["APPROVED"]}>
              <EditVendorProfile />
            </VendorGuard>
          }
        />

        {/* PASSWORD */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/request-reset" element={<RequestReset />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
