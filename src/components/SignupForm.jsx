import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignupForm.css";
import signupIllustration from "../assets/Rectangle-84.png";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Signup = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // 👈 stops page reload
    console.log("Signup clicked");
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-page">
      {/* Header */}
      <header className="auth-header">
        <Link to="/" className="header-left">
          <img src={logo} alt="VerifyCart" />
          <span id="link">
            Verify<span id="blue">Cart</span>
          </span>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="signup-hero">
        <div className="signup-text">
          <h1>Grow sales by becoming a verified vendor</h1>
          <p>
            Start the verification process to prove your authenticity and build
            trust with buyers.
          </p>
        </div>

        <div className="signup-image">
          <img src={signupIllustration} alt="Verification illustration" />
        </div>
      </section>

      {/* Form */}
      <section className="signup-form-wrapper">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input type="text" placeholder="Business Name" />
            <input type="text" placeholder="Business Address" />

            <input type="text" placeholder="Name" />
            <input type="text" placeholder="National ID" />

            <input type="email" placeholder="Email" />
            <input
              type="url"
              placeholder="Primary social media link (Required)"
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>

            <input type="tel" placeholder="Phone" />
          </div>

          <label className="checkbox">
            <input type="checkbox" />I certify that the information provided is
            accurate and I am authorized to apply for verification
          </label>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="login-text">
            Already have an account? <span>Log in</span>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;
