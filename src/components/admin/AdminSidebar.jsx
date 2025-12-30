import logo from "../../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import { logout } from "../../components/utils/logout";

export default function AdminSidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-logo">
        <img src={logo} alt="VerifyCart" />
        <span>
          Verify<span className="blue">Cart</span>
        </span>
      </div>

      <nav className="sidebar-nav" onClick={closeSidebar}>
        <NavLink to="/admin/dashboard" end>Dashboard</NavLink>

        <NavLink to="/admin/monitoring">Real-Time Monitoring</NavLink>
        <NavLink to="/admin/devices">My Devices</NavLink>
        <NavLink to="/admin/assistant">AI Assistant</NavLink>
        <NavLink to="/admin/billing">Billing & Cost Overview</NavLink>
      </nav>

      <button className="sidebar-logout" onClick={() => logout(navigate)}>
                Logout
              </button>
    </aside>
  );
}
