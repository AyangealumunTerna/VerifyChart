import "./AdminTopbar.css"

export default function AdminTopbar() {
  return (
    <div className="admin-topbar">
      <input type="search" placeholder="Search" className="admin-search" />

      <div className="admin-profile">
        <img src="https://i.pravatar.cc/40" alt="Admin" />
      </div>
    </div>
  );
}
