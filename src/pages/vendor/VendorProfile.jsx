import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../components/utils/logout";
import "./EditVendorProfile.jsx";
import "./VendorProfile.css";
import bannerImg from "../../assets/vendor-banner.jpg";
import avatarImg from "../../assets/vendor-avatar.jpg";
import location from "../../assets/location.png";
import link from "../../assets/link.png";
import calendar from "../../assets/calendar.png";

export default function VendorProfile() {
  const navigate = useNavigate();
  const formatLink = (link) => {
    if (!link) return "#";
    return link.startsWith("http") ? link : `https://${link}`;
  };
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
        <img
          src={vendor.bannerImage || bannerImg}
          alt="Vendor banner"
          id="vendor-banner"
        />

        <div className="vendor-info-box">
          <div className="vendor-avatar">
            <img src={vendor.avatarImage || avatarImg} alt="Vendor logo" />
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
                <p>Followers</p>
              </div>
              <div>
                <strong>{vendor.following}</strong>
                <p>Following</p>
              </div>
              <div>
                <strong>{vendor.products}</strong>
                <p>Products</p>
              </div>
              <div>
                <strong>{vendor.sales}+</strong>
                <p>Sales</p>
              </div>
              <div>
                <strong>{vendor.rating}★</strong>
                <p>Rating</p>
              </div>
            </div>

            {/* Meta */}
            <div className="vendor-meta">
              <span>
                <img src={location} alt="Location icon" id="icons" />{" "}
                {vendor.businessAddress}
              </span>{" "}
              <br />
              <span>
                <a
                  href={formatLink(vendor.socialLink)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="vendor-link"
                >
                  <span>
                    <img src={link} alt="Location icon" id="icons" />
                  </span>{" "}
                  {vendor.socialLink}
                </a>
              </span>
              <br />
              <span>
                <img src={calendar} alt="Location icon" id="icons" /> Member
                since {vendor.memberSince}
              </span>
            </div>

            {/* Actions */}
            <div className="vendor-actions">
              <button className="primary">Visit Shop</button>
              <button>Message</button>
              <button>Follow</button>
            </div>

            {/* Achievements */}
            <section className="vendor-section">
              <h3>Achievements</h3>

              <div className="achievements-grid">
                <div className="achievement-card">
                  🏆
                  <p>Top Seller</p>
                </div>

                <div className="achievement-card">
                  ⚡<p>Fast Delivery</p>
                </div>

                <div className="achievement-card">
                  💎
                  <p>Premium Quality</p>
                </div>

                <div className="achievement-card">
                  ⭐⭐⭐⭐⭐
                  <p>3 year member</p>
                </div>
              </div>
            </section>

            {/* Shop Policies */}
            <section className="vendor-section">
              <h3>Shop Policies</h3>

              <div className="policies">
                <div>
                  <strong>Returns</strong>
                  <p id="policy-p">40-day returns accepted</p>
                </div>

                <div>
                  <strong>Delivery</strong>
                  <p id="policy-p">Free delivery</p>
                </div>

                <div>
                  <strong>Payment</strong>
                  <p id="policy-p">Secure checkout guaranteed</p>
                </div>
              </div>
            </section>

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
