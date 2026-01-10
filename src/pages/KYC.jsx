import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitKycDocument } from "../services/kycService";
import "./KYC.css";
import FileUpload from "./FileUpload";


const KYC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    idDocument: null,
    proofOfAddress: null,
    cacCertificate: null,
  });

  const handleKycSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await submitKycDocument("ID", formData.idDocument);
      await submitKycDocument("ADDRESS", formData.proofOfAddress);
      await submitKycDocument("REGISTRATION", formData.cacCertificate);

      localStorage.setItem("vendorStatus", "PENDING");
      navigate("/kyc-pending");
    } catch (err) {
      setError("KYC submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="kyc-page">
      <h2>Vendor Verification (KYC)</h2>

      <form onSubmit={handleKycSubmit} className="kyc-form">
        <FileUpload
          label="Means of Identification (National ID Card, International Passport, Driver’s License)"
          file={formData.idDocument}
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, idDocument: file }))
          }
        />

        <FileUpload
          label="Proof of Address (Utility Bill or Bank Statement of Account)"
          file={formData.proofOfAddress}
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, proofOfAddress: file }))
          }
        />

        <FileUpload
          label="Business Registration (CAC Certificate)"
          file={formData.cacCertificate}
          onChange={(file) =>
            setFormData((prev) => ({ ...prev, cacCertificate: file }))
          }
        />

        {error && <p className="error-text">{error}</p>}

        <button type="submit" className="kyc-submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit for Verification"}
        </button>
      </form>
    </div>
  );
};

export default KYC;
