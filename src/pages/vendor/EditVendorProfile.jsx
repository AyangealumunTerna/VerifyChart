import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditVendorProfile.css";

export default function EditVendorProfile() {
  const navigate = useNavigate();

  /* =======================
     IMAGE STATE
  ======================= */
  const [images, setImages] = useState({
    profileImage: "",
    bannerImage: "",
  });

  /* =======================
     FORM STATE
  ======================= */
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    instagram: "",
    whatsapp: "",
    facebook: "",
    website: "",
    tiktok: "",
  });

  /* =======================
     IMAGE HANDLER
  ======================= */
  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) => ({
        ...prev,
        [field]: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  /* =======================
     UPLOAD IMAGES
  ======================= */
  const uploadImages = async () => {
    if (!images.profileImage && !images.bannerImage) return;

    const res = await fetch(
      "https://verifycart.onrender.com/api/vendor/profile/images",
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(images),
      }
    );

    if (!res.ok) {
      throw new Error("Image upload failed");
    }
  };

  /* =======================
     FORM CHANGE
  ======================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* =======================
     SAVE PROFILE
  ======================= */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Update profile info
      await fetch("https://verifycart.onrender.com/api/vendor/profile", {
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
      });

      // 2️⃣ Upload images (only if selected)
      await uploadImages();

      navigate("/vendor/profile");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  /* =======================
     JSX
  ======================= */
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

        <label>
          Profile Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "profileImage")}
          />
          {images.profileImage && (
            <img
              src={images.profileImage}
              alt="Profile preview"
              className="image-preview avatar"
            />
          )}
        </label>

        <label>
          Banner Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, "bannerImage")}
          />
          {images.bannerImage && (
            <img
              src={images.bannerImage}
              alt="Banner preview"
              className="image-preview banner"
            />
          )}
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
