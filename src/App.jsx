import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignupForm.jsx";
import Home from "./pages/Home";
import "./components/styles/breakpoints.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import Login from "./components/admin/Login.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { Navigate } from "react-router-dom";
import VendorProfile from "./pages/vendor/VendorProfile";
import ProtectedVendorRoute from "./components/vendor/ProtectedVendorRoute";
import EditVendorProfile from "./pages/vendor/EditVendorProfile";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {/* SHARED LOGIN */}
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
        {/* <Route path="/admin" element={<Navigate to="/login" replace />} /> */}

        {/* VENDOR */}
        <Route
          path="/vendor/profile"
          element={
            <ProtectedVendorRoute>
              <VendorProfile />
            </ProtectedVendorRoute>
          }
        />

        <Route
          path="/vendor/edit-profile"
          element={
            <ProtectedVendorRoute>
              <EditVendorProfile />
            </ProtectedVendorRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}
