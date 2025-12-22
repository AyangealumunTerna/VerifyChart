import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/SignupForm.jsx";
import Home from "./pages/Home";
import "./components/styles/breakpoints.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminLogin from "./components/admin/Login.jsx";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import { Navigate } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
      </Routes>
    </BrowserRouter>
  );
}
