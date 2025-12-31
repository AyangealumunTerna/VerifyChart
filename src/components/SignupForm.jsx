import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignupForm.css";
import signupIllustration from "../assets/Rectangle-84.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate(); // ✅ inside component
  const [showPassword, setShowPassword] = useState(false); // ✅ inside component
  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    ownerName: "",
    nationalId: "",
    email: "",
    socialLink: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Save AUTH details (for login)
    const authData = {
      role: "vendor",
      email: formData.email,
      password: formData.password,
    };

    // 2️⃣ Save VENDOR PROFILE details
    const vendorProfile = {
      businessName: formData.businessName,
      businessAddress: formData.businessAddress,
      ownerName: formData.ownerName,
      nationalId: formData.nationalId,
      socialLink: formData.socialLink,
      phone: formData.phone,
      memberSince: new Date().getFullYear(),
      followers: 0,
      following: 0,
      products: 0,
      sales: 0,
      rating: 0,
    };

    localStorage.setItem("auth", JSON.stringify(authData));
    localStorage.setItem("vendorProfile", JSON.stringify(vendorProfile));
    localStorage.setItem("role", "vendor");

    navigate("/vendor/profile");
  };

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
            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              value={formData.businessName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress}
              onChange={handleChange}
            />

            <input
              type="text"
              name="ownerName"
              placeholder="Name"
              value={formData.ownerName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="nationalId"
              placeholder="National ID"
              value={formData.nationalId}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="url"
              name="socialLink"
              placeholder="Primary social media link (Required)"
              value={formData.socialLink}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <label className="checkbox">
            <input type="checkbox" />I certify that the information provided is
            accurate and I am authorized to apply for verification
          </label>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Signup;
