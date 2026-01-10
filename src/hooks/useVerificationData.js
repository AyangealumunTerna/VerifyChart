import { useEffect, useState } from "react";
import { getPendingVerifications } from "../services/adminVerification";

export default function useVerificationData() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPendingVerifications();
        console.log("FULL API RESPONSE:", data);
        setItems(data.items || []);
      } catch (err) {
        console.error("Failed to fetch verification data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = {
    pending: items.filter((i) => i.status === "pending").length,
    approved: items.filter((i) => i.status === "approved").length,
    rejected: items.filter((i) => i.status === "rejected").length,

    today: {
      new: items.filter((i) => i.status === "pending").length,
      approved: 0,
      rejected: 0,
    },
  };
  console.log("API URL =", import.meta.env.VITE_API_URL);


  return { items, stats, loading };
}
