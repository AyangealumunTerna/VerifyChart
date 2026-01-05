import { useState } from "react";
import "./HeroVerifyBox.css";
import VerificationResult from "./VerificationResult";
import axios from "axios";

export default function HeroVerifyBox() {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | verified
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const isActive = handle.trim().length > 0;

  const extractQuery = (input) => {
    let value = input.trim();

    // Remove protocol
    value = value.replace(/^https?:\/\//, "");

    // Remove www.
    value = value.replace(/^www\./, "");

    // Remove domain paths (instagram, linkedin, twitter, etc)
    value = value
      .replace(/instagram\.com\//, "")
      .replace(/linkedin\.com\/in\//, "")
      .replace(/twitter\.com\//, "")
      .replace(/facebook\.com\//, "");

    // Remove trailing slash
    value = value.replace(/\/$/, "");

    // Remove @ if present
    value = value.replace(/^@/, "");

    return value;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isActive) return;

    setStatus("scanning");
    setError(null);
    setResult(null);

    const query = extractQuery(handle);

    try {
      const res = await axios.get(
        `https://verifycart.onrender.com/api/vendor/search?q=${query}`
      );

      if (res.data.count > 0) {
        setResult(res.data.results[0]);
        setStatus("verified");
      } else {
        setStatus("idle");
        setError("Vendor not found in our database");
      }
    } catch (err) {
      const statusCode = err.response?.status;

      console.log("SEARCH QUERY:", query);
      console.log("API status:", statusCode);

      setStatus("idle");
      setResult(null);

      if (statusCode === 404) {
        setError("Vendor not found in our database");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <section className="hero-verify">
      <h1>Determine the Authenticity of Your Vendor’s Social Handle</h1>

      <p className="hero-subtext">
        Enter a social media profile link to verify if the vendor is legitimate
      </p>

      <form onSubmit={handleSubmit} className="verify-form">
        <input
          type="text"
          placeholder="e.g. @vendorname or https://instagram.com/vendorname"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          disabled={status === "scanning"}
        />

        <button type="submit" disabled={!isActive || status === "scanning"}>
          {status === "scanning" ? "Verifying..." : "Verify Now"}
        </button>
      </form>

      {/* SCANNING UI */}
      {status === "scanning" && <VerificationResult />}

      {/* RESULT UI */}
      {status === "verified" && result && (
        <VerificationResult /* score={90} */ vendor={result} />
      )}
{/* score={90} */}
      {error && <p className="error-text">{error}</p>}
    </section>
  );
}
