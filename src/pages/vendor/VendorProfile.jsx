import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../components/utils/logout";
import "./EditVendorProfile.jsx";
import "./VendorProfile.css";
import bannerImg from "../../assets/vendor-banner.jpg";
import avatarImg from "../../assets/vendor-avatar.jpg";

export default function VendorProfile() {
  const navigate = useNavigate();

  const [vendor] = useState(() => {
    const role = localStorage.getItem("role");
    const storedProfile = localStorage.getItem("vendorProfile");

    if (role !== "vendor" || !storedProfile) {
      return null;
    }

    try {
      return JSON.parse(storedProfile);
    } catch {
      return null;
    }
  });

  if (!vendor) {
    navigate("/login", { replace: true });
    return null;
  }

  return (
    <div className="vendor-page">
      {/* Banner */}
      <div className="vendor-header">
        <img src={bannerImg} alt="Vendor banner" />

        <div className="vendor-info-box">
          <div className="vendor-avatar">
            <img src={avatarImg} alt="Vendor logo" />
          </div>

          <div className="vendor-main">
            <div className="vendor-title">
              <h2>{vendor.businessName}</h2>
              <div className="verified-wrapper">
                <span className="verified-dot">✔</span>
                <span className="verified-tooltip">Verified Vendor</span>
              </div>
            </div>

            <p className="vendor-description">
              Your smart plug for premium quality footwears. We specialize in
              classy shoes, sandals, sneakers and more.
            </p>

            {/* Stats */}
            <div className="vendor-stats">
              <div>
                <strong>{vendor.followers / 1000}k</strong>
                <span>Followers</span>
              </div>
              <div>
                <strong>{vendor.following}</strong>
                <span>Following</span>
              </div>
              <div>
                <strong>{vendor.products}</strong>
                <span>Products</span>
              </div>
              <div>
                <strong>{vendor.sales}+</strong>
                <span>Sales</span>
              </div>
              <div>
                <strong>{vendor.rating}★</strong>
                <span>Rating</span>
              </div>
            </div>

            {/* Meta */}
            <div className="vendor-meta">
              <span>📍 {vendor.businessAddress}</span>
              <span>🔗 {vendor.socialLink}</span>
              <span>📅 Member since {vendor.memberSince}</span>
            </div>

            {/* Actions */}
            <div className="vendor-actions">
              <button className="primary">Visit Shop</button>
              <button>Message</button>
              <button>Follow</button>
            </div>

            <div className="vendor-settings">
              <button
                className="edit-btn"
                onClick={() => navigate("/vendor/edit-profile")}
              >
                Edit Profile
              </button>

              <button className="logout-btn" onClick={() => logout(navigate)}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
