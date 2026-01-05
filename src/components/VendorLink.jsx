import { formatLink } from "./utils/formatLink";
import "../pages/vendor/VendorProfile.css";

export default function VendorLink({ href, icon, label }) {
  if (!href) return null;

  return (
    <span>
      <a
        href={formatLink(href)}
        target="_blank"
        rel="noopener noreferrer"
        className="vendor-link"
        id="vendor-link"
      >
        <img src={icon} alt="" className="vendor-icon" id="icons"/>
        {label || href}
      </a>
    </span>
  );
}
