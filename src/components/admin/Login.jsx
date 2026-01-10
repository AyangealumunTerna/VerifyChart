import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { loginVendor } from "../../services/vendorAuth";
import { loginAdmin } from "../../services/adminAuth";
// import { FiEye, FiEyeOff } from "react-icons/fi";
import { FiEye, FiEyeOff, FiShield, FiShoppingBag } from "react-icons/fi";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginType, setLoginType] = useState("vendor"); // vendor | admin
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("mode") === "admin") {
      setLoginType("admin");
    }
  }, [location.search]);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (loginType === "admin") {
        const res = await loginAdmin({ email, password });

        localStorage.setItem("role", "admin");
        localStorage.setItem("adminToken", res.token);
        // localStorage.setItem("vendorStatus", res.vendorStatus);

        navigate("/admin/dashboard", { replace: true });
        return;
      }

      // VENDOR LOGIN
      const res = await loginVendor({ email, password });

      // localStorage.setItem("vendorId", res.vendorId);
      localStorage.setItem("role", "vendor");
      // localStorage.setItem("vendorStatus", res.vendorStatus);
      localStorage.setItem("vendorStatus", "VERIFIED"); // 🔥 FORCE VERIFIED FOR DEMO

      localStorage.setItem("vendorToken", res.token);

      switch (res.vendorStatus) {
        case "NOT_SUBMITTED":
        case "REJECTED":
          navigate("/kyc");
          break;
        case "PENDING":
          navigate("/kyc-pending");
          break;
        case "VERIFIED":
          navigate("/vendor/profile");
          break;

        default:
          navigate("/login");
      }
      console.log("LOGIN RESPONSE:", res);
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === "This document is already under review") {
        navigate("/kyc-pending");
      } else {
        setError(message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <button className="back-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>

      <div
        className={`login-card ${loginType === "admin" ? "admin-mode" : ""}`}
      >
        <h3>{loginType === "admin" ? "Admin Login" : "Vendor Login"}</h3>

        <p className="login-subtext">
          {loginType === "admin"
            ? "Admin access only"
            : "Access your VerifyCart vendor dashboard"}
        </p>

        {error && <p className="login-error">{error}</p>}

        <div className="login-switch">
          <div
            className={`switch-indicator ${
              loginType === "admin" ? "right" : "left"
            }`}
          />

          <button
            type="button"
            className={loginType === "vendor" ? "active" : ""}
            onClick={() => setLoginType("vendor")}
          >
            <FiShoppingBag />
            Vendor
          </button>

          <button
            type="button"
            className={loginType === "admin" ? "active" : ""}
            onClick={() => setLoginType("admin")}
          >
            <FiShield />
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD WITH EYE TOGGLE */}
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </span>
          </div>

          {/* FORGOT PASSWORD LINK */}
          <div className="forgot-password">
            <Link to="/request-reset">Forgot password?</Link>
          </div>

          <button type="submit" disabled={loading}>
            {loading
              ? "Logging in..."
              : loginType === "admin"
              ? "Login as Admin"
              : "Login as Vendor"}
          </button>
        </form>
      </div>
    </div>
  );
}
