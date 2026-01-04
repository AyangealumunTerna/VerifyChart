import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./ForgotPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [success, setSuccess] = useState(false);

  const { email, resetCode } = location.state || {};

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const getStrength = (password) => {
    if (password.length < 6) return "weak";
    if (/[A-Z]/.test(password) && /\d/.test(password)) return "strong";
    return "medium";
  };

  const strength = getStrength(password);

  // Safety guard
  if (!email || !resetCode) {
    navigate("/login");
    return null;
  }

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");

    setSuccess(true);

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2500);

    if (success) {
      return (
        <div className="auth-container">
          <div className="auth-card success-card">
            <div className="success-check">✓</div>
            <h2>Password Reset Successful</h2>
            <p>Redirecting to login...</p>
          </div>
        </div>
      );
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://verifycart.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            resetCode,
            newPassword: password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      alert("Password reset successful. Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <p>
          Create a new password for <strong>{email}</strong>
        </p>

        {error && <p className="auth-error">{error}</p>}

        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New password"
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
        <div className={`strength ${strength}`}>
          Password strength: {strength}
        </div>

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
