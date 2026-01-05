import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditVendorProfile.css";

export default function EditVendorProfile() {
  const navigate = useNavigate();

  // const handleImage = (e, field) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: reader.result,
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    instagram: "",
    whatsapp: "",
    facebook: "",
    website: "",
    tiktok: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://verifycart.onrender.com/api/vendor/profile",
        {
          method: "PATCH",
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            businessName: formData.businessName,
            phone: formData.phone,
            socialLinks: {
              instagram: formData.instagram,
              whatsapp: formData.whatsapp,
              facebook: formData.facebook,
              website: formData.website,
              tiktok: formData.tiktok,
            },
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      // sync updated profile locally
      localStorage.setItem("vendorProfile", JSON.stringify(data.vendor));

      navigate("/vendor/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
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
          Phone
          <input name="phone" value={formData.phone} onChange={handleChange} />
        </label>

        <label>
          Instagram
          <input
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
          />
        </label>

        <label>
          WhatsApp
          <input
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />
        </label>

        <label>
          Website
          <input
            name="website"
            value={formData.website}
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
