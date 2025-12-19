import "./VerificationResult.css";

export default function VerificationResult({ score }) {
  const getScoreClass = () => {
    if (score >= 80) return "score-green";
    if (score >= 50) return "score-yellow";
    return "score-red";
  };

  const verifiedBg= () => {
    if (score >= 80) return "verified-green-bg";
    if (score >= 50) return "verified-yellow-bg";
    return "verified-red-bg";
  }

  const scoreClass = getScoreClass();
  const verifiedBgClass = verifiedBg();

  return (
    <div className="verification-result">
      <div className={`verified-banner ${verifiedBgClass}`}>
        <div className="vendor-info">
          <div className="verified-icon">✔</div>
          <div>
            <h3>Verified Vendor</h3>
            <p>Jane Forever Wears</p>
            <span>Instagram Account</span>
          </div>
        </div>

        <div className="score-box">
          <h2>{score}%</h2>
          <small>Trust Score</small>
        </div>
      </div>

      <h4>Social Media Account Information</h4>

      <ul className="info-list">
        <li><span>Age of Account</span><span>2 years 4 months</span></li>
        <li><span>Popularity</span><span>Very Popular</span></li>
        <li><span>Followers</span><span>50.5k</span></li>
        <li><span>Threats Detected</span><span>No Threats</span></li>
        <li><span>Review Score</span><span>4.9 / 5.0</span></li>
      </ul>

      <div className="platform-badge">
        Platform Verified Badge
      </div>

      <h4 id="positive">Positive Highlights</h4>

      <ul className={`highlights ${scoreClass}`}>
        <li>Platform verified account</li>
        <li>Lots of traffic</li>
        <li>Positive customer reviews</li>
        <li>Consistent posting history</li>
        <li>Secure payment methods</li>
      </ul>

      <div className="action-buttons">
        <button className="secondary">Visit Social media handle</button>
        <button className="danger">Report Issue</button>
      </div>
    </div>
  );
}
