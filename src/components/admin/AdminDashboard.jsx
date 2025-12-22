import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import AnimatedCounter from "./AnimatedCounter";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* MOBILE TOGGLE */}
      <button
        className="menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      {/* SINGLE SIDEBAR */}
      <AdminSidebar
        onLogout={logout}
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      <main className="admin-main">
        <AdminTopbar />

        <h1 className="dashboard-title">Dashboard</h1>

        <div className="stats-grid">
          <div className="stat-card">
            <p>Pending</p>
            <AnimatedCounter value={18} />
          </div>

          <div className="stat-card">
            <p>Approved</p>
            <AnimatedCounter value={18} />
          </div>

          <div className="stat-card">
            <p>Rejected</p>
            <AnimatedCounter value={18} />
          </div>

          <div className="stat-card large">
            <p>Applications Today</p>
            <AnimatedCounter value={18} />
            <small>13 New • 19 in Review</small>
          </div>

          <div className="stat-card">
            <p>Average Review Time</p>
            <AnimatedCounter value={18} />
          </div>

          <div className="stat-card">
            <p>Open Complaints</p>
            <AnimatedCounter value={18} />
          </div>
        </div>
      </main>
    </div>
  );
}
