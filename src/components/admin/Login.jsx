import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const fakeUserFromDB = {
      email: "admin@verifycart.com",
      password: "admin123",
      role: "admin",
    };

    if (
      email === fakeUserFromDB.email &&
      password === fakeUserFromDB.password
    ) {
      localStorage.setItem("role", fakeUserFromDB.role);

      if (fakeUserFromDB.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      setError("Invalid login details");
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
