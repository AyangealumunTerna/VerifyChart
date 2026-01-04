import "./RecentComplaints.css"

function RecentComplaints() {
  return (
    <div className="card">
      <h3>Recent Complaints</h3>

      <ul className="complaints-list">
        <li>
          <span>Jenna Footwear Stores</span>
          <span className="badge open">Open</span>
        </li>

        <li>
          <span>Mickey Electricals</span>
          <span className="badge resolved">Resolved</span>
        </li>
      </ul>

      <a href="/admin/complaints" className="view-all">
        View all complaints →
      </a>
    </div>
  );
}
export default RecentComplaints;