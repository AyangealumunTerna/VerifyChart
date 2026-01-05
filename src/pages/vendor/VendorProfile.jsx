import { useNavigate } from "react-router-dom";
import { logout } from "../../components/utils/logout";
import "./VendorProfile.css";
import bannerImg from "../../assets/vendor-banner.jpg";
import avatarImg from "../../assets/vendor-avatar.jpg";
import location from "../../assets/location.png";
import link from "../../assets/link.png";
import calendar from "../../assets/calendar.png";
import { useEffect, useState } from "react";
import axios from "axios";
import VendorLink from "../../components/VendorLink";
import { formatLink } from "../../components/utils/formatLink";


export default function VendorProfile() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId) {
      setError(true);
      return;
    }

    axios
      .get(`https://verifycart.onrender.com/api/vendor/summary/${vendorId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setVendor(res.data.vendor);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  if (error) {
    return <p style={{ padding: "2rem" }}>Profile not available yet</p>;
  }
  if (!vendor && !error) {
    return <p style={{ padding: "2rem" }}>Loading profile...</p>;
  }
  // const primaryLink = vendor?.socialLinks?.website;
  // const secondaryLink = vendor?.socialLinks?.instagram;
  const getShopLink = () => {
    return (
      vendor?.socialLinks?.website ||
      vendor?.socialLinks?.instagram ||
      vendor?.socialLinks?.linkedin ||
      null
    );
  };
  const getVisitShopLabel = () => {
    if (vendor?.socialLinks?.website) return "Visit Website";
    if (vendor?.socialLinks?.instagram) return "Visit Instagram Shop";
    return "Shop Unavailable";
  };

  return (
    <div className="vendor-page">
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
              <h2>{vendor.businessName || vendor.shopName || "My Shop"}</h2>
              <div className="verified-wrapper">
                <span className="verified-dot">✔</span>
                <span className="verified-tooltip">Verified Vendor</span>
              </div>
            </div>

            <p className="vendor-description">
              Your smart plug for premium quality footwears.
            </p>

            <div className="vendor-stats">
              <div>
                <strong>{vendor.followers ?? 0}</strong>
                <p>Followers</p>
              </div>
              <div>
                <strong>{vendor.following ?? 0}</strong>
                <p>Following</p>
              </div>
              <div>
                <strong>{vendor.products ?? 0}</strong>
                <p>Products</p>
              </div>
              <div>
                <strong>{vendor.sales}+</strong>
                <p>Sales</p>
              </div>
              <div>
                <strong>{vendor.rating ?? 0}★</strong>
                <p>Rating</p>
              </div>
            </div>

            <div className="vendor-meta">
              <span>
                <img src={location} alt="" id="icons" />
                {vendor.businessAddress || "No address set"}
              </span>

              <VendorLink
                href={vendor?.socialLinks?.website}
                icon={link}
                label="Official Website"
              />

              <VendorLink
                href={vendor?.socialLinks?.instagram}
                icon={link}
                label="Instagram Page"
              />

              <VendorLink
                href={vendor?.socialLinks?.linkedin}
                icon={link}
                label="LinkedIn Profile"
              />

              <span>
                <img src={calendar} alt="" id="icons" />
                Member since {vendor.createdAt?.slice(0, 10)}
              </span>
            </div>
            {/* Actions */}
            <div className="vendor-actions">
              <button
                className="primary"
                disabled={!getShopLink()}
                onClick={() => {
                  const link = getShopLink();
                  if (!link) return;
                  window.open(
                    formatLink(link),
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              >
                {getVisitShopLabel()}
              </button>

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
                onClick={() => navigate("/vendor/edit-profile")}
                className="edit-btn"
              >
                Edit Profile
              </button>
              <button
                onClick={() => logout(navigate, setVendor)}
                className="logout-btn"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
