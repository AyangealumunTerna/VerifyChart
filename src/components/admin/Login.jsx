import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // 1️⃣ ADMIN LOGIN (hard-coded system user)
    if (email === "admin@verifycart.com" && password === "admin123") {
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
      return;
    }

    // 2️⃣ VENDOR LOGIN (from localStorage)
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (
      auth &&
      email === auth.email &&
      password === auth.password &&
      auth.role === "vendor"
    ) {
      localStorage.setItem("role", "vendor");
      navigate("/vendor/profile");
      return;
    }

    // 3️⃣ If nothing matches
    setError("Invalid login details");
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

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
