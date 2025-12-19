import shield from "../assets/shield.png";
import trust from "../assets/trust.png";
import community from "../assets/community.png";
import "./FeaturesSection.css";

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="feature-card">
        <div className="icon blue"><img src={shield} alt="Real-time Verification" id="icon"/></div>
        <div>
          <h4>Real-time Verification</h4>
          <p>
            Instant checks of vendors’ social media handles against scams
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="icon green"><img src={community} alt="community Report" id="icon"/></div>
        <div>
          <h4>Community Reports</h4>
          <p>
            Reports made by thousands of real users worldwide
          </p>
        </div>
      </div>

      <div className="feature-card">
        <div className="icon red"><img src={trust} alt="Trust Score" id="icon"/></div>
        <div>
          <h4>Trust Score</h4>
          <p>
            Analysis of the rate of authenticity of online vendors’ social links
          </p>
        </div>
      </div>
    </section>
  );
}
