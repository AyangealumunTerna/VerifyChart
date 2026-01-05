import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./SignupForm.css";
import signupIllustration from "../assets/Rectangle-84.png";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { registerVendor } from "../services/vendorAuth";

const Signup = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const navigate = useNavigate(); // ✅ inside component
  const [showPassword, setShowPassword] = useState(false); // ✅ inside component

  const [formData, setFormData] = useState({
    businessName: "",
    businessAddress: "",
    ownerName: "",
    email: "",
    socialLink: "",
    secondaryLink: "",
    password: "",
    phone: "",
  });

  const [certified, setCertified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    if (!certified) {
      setGeneralError("You must certify the information before signing up.");
      return;
    }

    const newErrors = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, number, and special character";
    }

    if (formData.phone.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);

      // ✅ NORMALIZE URLS SAFELY
      const normalizeUrl = (url) =>
        url.startsWith("http") ? url : `https://${url}`;

      // ✅ BUILD SOCIAL LINKS CLEANLY
      const socialLinks = {
        website: normalizeUrl(formData.socialLink.trim()),
      };

      if (formData.secondaryLink.trim()) {
        socialLinks.instagram = normalizeUrl(formData.secondaryLink.trim());
      }

      // ✅ FINAL PAYLOAD
      const payload = {
        name: formData.ownerName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.replace(/\D/g, ""), // 🔥 important
        password: formData.password.trim(),
        businessName: formData.businessName.trim(),
        // businessAddress: formData.businessAddress.trim(),
        socialLinks,
      };

      console.log("REGISTER PAYLOAD:", payload);
      await registerVendor(payload);

      navigate("/login");
    } catch (err) {
      const data = err.response?.data;

      if (data?.message?.toLowerCase().includes("email")) {
        setErrors({ email: data.message });
      } else if (data?.errors?.length) {
        const backendErrors = {};
        data.errors.forEach((e) => {
          backendErrors[e.field || "general"] = e.message;
        });
        setErrors(backendErrors);
      } else {
        setGeneralError(data?.message || "Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
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

            {/* <input
              type="text"
              name="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress}
              onChange={handleChange}
            /> */}

            <input
              type="text"
              name="ownerName"
              placeholder="Name"
              value={formData.ownerName}
              onChange={handleChange}
            />

            {/* <input
              type="text"
              name="nationalId"
              placeholder="National ID"
              value={formData.nationalId}
              onChange={handleChange}
            /> */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="url"
              name="socialLink"
              placeholder="Primary social media link (Required)"
              value={formData.socialLink}
              onChange={handleChange}
            />
            <input
              type="url"
              name="secondaryLink"
              placeholder="Secondary social link (Optional)"
              value={formData.secondaryLink}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}

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
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={certified}
              onChange={(e) => setCertified(e.target.checked)}
              required
            />
            I certify that the information provided is accurate and I am
            authorized to apply for verification
          </label>

          <button
            type="submit"
            className="btn-primary"
            disabled={!certified || loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <p className="login-text">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          {generalError && <p className="error-text">{generalError}</p>}
        </form>
      </section>
    </div>
  );
};

export default Signup;
