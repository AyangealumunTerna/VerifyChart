import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import StatsGrid from "./StatsGrid/StatsGrid";
import ApplicationsList from "./ApplicationsList";
import RecentComplaints from "./RecentComplaints";
import { logout as logoutUtil } from "../utils/logout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logoutUtil({ navigate });
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
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SINGLE SIDEBAR */}
      <div className="admin-layout">
        <AdminSidebar
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        <main className="admin-main">
          <AdminTopbar />

          <h1 className="dashboard-title">Merchant Dashboard</h1>

          <StatsGrid />

          <section className="dashboard-content">
            <ApplicationsList />
            <RecentComplaints />
          </section>
        </main>
      </div>
    </div>
  );
}
