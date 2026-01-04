import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [resetCode, setResetCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  // ✅ SAFE REDIRECT
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);
  if (!email) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://verifycart.onrender.com/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetCode }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid or expired code");
      }

      navigate("/reset-password", {
        state: { email, resetCode },
      });
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND CODE (NOW CORRECT)
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      setResendLoading(true);

      await fetch("https://verifycart.onrender.com/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setTimer(30);

      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch {
      alert("Failed to resend code");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleVerify}>
        <h2>Verify Reset Code</h2>
        <p>
          Enter the reset code sent to <strong>{email}</strong>
        </p>

        {error && <p className="auth-error">{error}</p>}

        <input
          type="text"
          placeholder="Enter reset code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify Code"}
        </button>

        <button
          type="button"
          className="resend-btn"
          onClick={handleResend}
          disabled={resendLoading || timer > 0}
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend code"}
        </button>
      </form>
    </div>
  );
}
