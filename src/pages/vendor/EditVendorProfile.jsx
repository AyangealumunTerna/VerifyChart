import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditVendorProfile.css";

export default function EditVendorProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const storedProfile = localStorage.getItem("vendorProfile");
    if (!storedProfile) return null;

    try {
      const profile = JSON.parse(storedProfile);
      return {
        businessName: profile.businessName || "",
        businessAddress: profile.businessAddress || "",
        phone: profile.phone || "",
        socialLink: profile.socialLink || "",
      };
    } catch {
      return null;
    }
  });

  if (!formData) {
    navigate("/login", { replace: true });
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("vendorProfile", JSON.stringify(formData));
    navigate("/vendor/profile");
  };

  return (
    <div className="edit-container">
      <form className="edit-card" onSubmit={handleSave}>
        <h2>Edit Profile</h2>

        <label>
          Business Name
          <input
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
          />
        </label>

        <label>
          Business Address
          <input
            name="businessAddress"
            value={formData.businessAddress}
            onChange={handleChange}
          />
        </label>

        <label>
          Phone
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Social Link
          <input
            name="socialLink"
            value={formData.socialLink}
            onChange={handleChange}
          />
        </label>

        <div className="edit-actions">
          <button type="submit">Save Changes</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/vendor/profile")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
