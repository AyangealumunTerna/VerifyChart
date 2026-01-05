import "./VerificationResult.css";

export default function VerificationResult({ vendor }) {
  const score = Number(vendor?.trustScore ?? 0);

  const getScoreClass = () => {
    if (score >= 80) return "score-green";
    if (score >= 50) return "score-yellow";
    return "score-red";
  };
  const socialLink =
    vendor?.socialLinks?.instagram ||
    vendor?.socialLinks?.website ||
    vendor?.socialLinks?.linkedin ||
    null;

  const openSocialLink = (value) => {
    if (!value) {
      alert("Social media link not available");
      return;
    }

    const url = value.startsWith("http") ? value : `https://${value}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const verifiedBg = () => {
    if (score >= 80) return "verified-green-bg";
    if (score >= 50) return "verified-yellow-bg";
    return "verified-red-bg";
  };

  const getVendorStatusText = () => {
    if (score >= 80) return "Verified Vendor";
    if (score >= 50) return "Vendor Requires Caution";
    return "High-Risk Vendor";
  };
  const getStatusIcon = () => {
    if (score >= 80) return "✔";
    if (score >= 50) return "⚠";
    return "✖";
  };

  const scoreClass = getScoreClass();
  const verifiedBgClass = verifiedBg();
  const getHighlightConfig = () => {
    if (score >= 80) {
      return {
        title: "Positive Highlights",
        className: "highlights-positive",
        items: [
          "Platform verified account",
          "Strong engagement and traffic",
          "Positive customer reviews",
          "Consistent posting history",
          "Secure payment methods detected",
        ],
      };
    }

    if (score >= 50) {
      return {
        title: "⚠️ Warning Signals",
        className: "highlights-warning",
        items: [
          "Limited engagement on recent posts",
          "Inconsistent posting activity",
          "Few verifiable customer reviews",
          "Account details partially verified",
          "Proceed with caution before payment",
        ],
      };
    }

    return {
      title: "🚨 Risk Indicators",
      className: "highlights-danger",
      items: [
        "Low trust score detected",
        "Unverified or suspicious account activity",
        "Negative or missing customer reviews",
        "High risk of impersonation or fraud",
        "Avoid making payments to this vendor",
      ],
    };
  };

  const highlightConfig = getHighlightConfig();

  console.log("Vendor data:", vendor);

  return (
    <div className="verification-result">
      <div className={`verified-banner ${verifiedBgClass}`}>
        <div className="vendor-info">
          <div className="verified-icon">{getStatusIcon()}</div>
          <div>
            <h3>{getVendorStatusText()}</h3>
            <p>{vendor?.businessName || "Unknown Vendor"}</p>
            <span>{vendor?.platform || "Social Media Account"}</span>
          </div>
        </div>

        <div className="score-box">
          <h2>{score}%</h2>
          <small>Trust Score</small>
        </div>
      </div>

      <h4>Social Media Account Information</h4>

      <ul className="info-list">
        <li>
          <span>Age of Account</span>
          <span>2 years 4 months</span>
        </li>
        <li>
          <span>Popularity</span>
          <span>Very Popular</span>
        </li>
        <li>
          <span>Followers</span>
          <span>{vendor?.followers ?? "Not available"}</span>
        </li>
        <li>
          <span>Threats Detected</span>
          <span>No Threats</span>
        </li>
        <li>
          <span>Review Score</span>
          <span>4.9 / 5.0</span>
        </li>
      </ul>

      <div className="platform-badge">Platform Verified Badge</div>

      <h4>{highlightConfig.title}</h4>

      <ul className={`highlights ${highlightConfig.className}`}>
        {highlightConfig.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div className="action-buttons">
        <button
          className="secondary"
          disabled={!socialLink}
          onClick={() => openSocialLink(socialLink)}
        >
          Visit Social Media
        </button>{" "}
        <button className="danger">Report Issue</button>
      </div>
    </div>
  );
}
