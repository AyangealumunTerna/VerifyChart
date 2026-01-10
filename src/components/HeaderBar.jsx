import logo from "../assets/logo.png";
import badge from "../assets/badge.png";
import { Link } from "react-router-dom";
import "./HeaderBar.css";

export const HeaderBar = () => (
  <header className="header">
    <div className="header-left">
      <img src={logo} alt="VerifyCart" />
      <span>
        Verify<span id="blue">Cart</span>
      </span>
    </div>

    <div className="header-right">
      <Link to="/login?mode=admin" className="admin-btn signup-btn">
        Login
      </Link>

      <Link to="/Signup" className="signup-btn">
        Sign up
      </Link>

      <img src={badge} alt="badge" id="badge" className="verified-count" />
      <span className="verified-count">2.3M+ Vendors Verified</span>
    </div>
  </header>
);
