import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://verifycart.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset code");
      }

      navigate("/forgot-password", {
        state: { email },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a reset code</p>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Code"}
        </button>
      </form>
    </div>
  );
}
