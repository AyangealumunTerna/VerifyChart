import logo from "../assets/logo.png";
import badge from "../assets/badge.png";
import "./HeaderBar.css";

export const HeaderBar = () => (
  <header className="header">
    <div className="header-left">
      <img src={logo} alt="VerifyCart" />
      <span>Verify<span id="blue">Cart</span></span>
    </div>

    <div className="header-right">
      <img src={badge} alt="badge" id="badge" /> <span>2.3M+ Vendors Verified</span>
    </div>
  </header>
);
