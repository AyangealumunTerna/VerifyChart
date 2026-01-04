import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginVendor } from "../../services/vendorAuth";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // 🔐 ADMIN LOGIN (hard-coded)
    if (email === "admin@verifycart.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard", { replace: true });
      return;
    }

    try {
      setLoading(true);

      const res = await loginVendor({ email, password });

      localStorage.setItem("vendorId", res.vendorId);
      localStorage.setItem("role", "vendor");

      navigate("/vendor/profile");
    } catch (err) {
      if (err.response?.status === 400) {
        setError("Invalid email or password");
      } else {
        setError(err.response?.data?.message || "Login failed. Try again.");
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

      <div className="login-card">
        <h2>Login</h2>
        <p className="login-subtext">Access your VerifyCart dashboard</p>

        {error && <p className="login-error">{error}</p>}

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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
