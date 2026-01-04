import "./ApplicationsList.css"

function ApplicationsList() {
  return (
    <div className="card">
      <div className="tabs">
        <button className="active">All</button>
        <button>Pending</button>
        <button>Approved</button>
        <button>Rejected</button>
        <button>Flagged</button>
      </div>

      <ul className="merchant-list">
        <li>
          <img src="https://i.pravatar.cc/40" alt="" />
          <div>
            <strong>Jenna Footwear Stores</strong>
            <span>Fashion • Lagos</span>
          </div>
          <span className="status verified">Verified</span>
        </li>

        <li>
          <img src="https://i.pravatar.cc/41" alt="" />
          <div>
            <strong>Mickey Electricals</strong>
            <span>Electronics • Abuja</span>
          </div>
          <span className="status pending">Pending</span>
        </li>
      </ul>
    </div>
  );
}
export default ApplicationsList;