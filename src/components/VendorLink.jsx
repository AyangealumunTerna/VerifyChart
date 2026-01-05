import { formatLink } from "./utils/formatLink";

export default function VendorLink({ href, icon, label }) {
  if (!href) return null;

  return (
    <span>
      <a
        href={formatLink(href)}
        target="_blank"
        rel="noopener noreferrer"
        className="vendor-link"
      >
        <img src={icon} alt="" className="vendor-icon" />
        {label || href}
      </a>
    </span>
  );
}
