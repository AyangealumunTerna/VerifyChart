import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignupForm.jsx";
import Home from "./pages/Home";
import "./components/styles/breakpoints.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/Login.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { Navigate } from "react-router-dom";
import VendorProfile from "./pages/vendor/VendorProfile";
import ProtectedVendorRoute from "./components/vendor/ProtectedVendorRoute";
import EditVendorProfile from "./pages/vendor/EditVendorProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />

        {/* SHARED LOGIN */}
        <Route path="/login" element={<AdminLogin />} />

        {/* ADMIN */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/login" replace />} />

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
      </Routes>
    </BrowserRouter>
  );
}
