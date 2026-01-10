import { useEffect, useState } from "react";
import "./ApplicationsList.css";
import {
  getAllVerifications,
  getPendingVerifications,
  getVerifiedVendors,
  getRejectedVendors,
  reviewVerification,
} from "../../services/adminVerification";

function ApplicationsList({ setVendors }) {
  const [vendors, setLocalVendors] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        let data = [];

        if (activeTab === "All") {
          data = await getAllVerifications();
        } else if (activeTab === "Pending") {
          data = await getPendingVerifications();
        } else if (activeTab === "Approved") {
          data = await getVerifiedVendors();
        } else if (activeTab === "Rejected") {
          data = await getRejectedVendors();
        }

        setLocalVendors(data);
        setVendors(data);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [activeTab, setVendors]);

  const handleDecision = async (id, decision) => {
    try {
      await reviewVerification(id, decision);

      // Refresh list after action
      setActiveTab("Pending");
    } catch (err) {
      console.error("Failed to review verification", err);
      alert("Action failed. Please try again.");
    }
  };

  return (
    <div className="card">
      <div className="tabs">
        {["All", "Pending", "Approved", "Rejected", "Flagged"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading merchants...</p>
      ) : (
        <ul className="merchant-list">
          {vendors.length === 0 ? (
            <p>No merchants found</p>
          ) : (
            vendors.map((item) => (
              <li key={item.id}>
                <img src={`https://i.pravatar.cc/40?u=${item.id}`} alt="" />

                <div>
                  <strong>{item.vendor?.businessName}</strong>
                  <span>
                    {item.vendor?.category} • {item.vendor?.location}
                  </span>
                </div>

                <span className={`status ${item.status?.toLowerCase()}`}>
                  {item.status}
                </span>

                {item.status?.toLowerCase() === "pending" && (
                  <div className="actions">
                    <button
                      className="approve"
                      onClick={() => handleDecision(item.id, "Verified")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject"
                      onClick={() => handleDecision(item.id, "REJECTED")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default ApplicationsList;
