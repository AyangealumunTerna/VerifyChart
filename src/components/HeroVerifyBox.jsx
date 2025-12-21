import { useState } from "react";
import "./HeroVerifyBox.css";
import VerificationResult from "./VerificationResult";


export default function HeroVerifyBox() {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | verified

  const isActive = handle.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isActive) return;

    setStatus("scanning");

    setTimeout(() => {
      setStatus("verified");
    }, 2500);
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
      {status === "verified" && <VerificationResult score={85} />}
    </section>
  );
}
