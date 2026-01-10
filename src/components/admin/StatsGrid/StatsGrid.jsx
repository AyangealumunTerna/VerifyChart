import StatCard from "./StatCard";
import "./StatsGrid.css";

export default function StatsGrid({ vendors = [] }) {
  const pending = vendors.filter(
    (v) => v.status?.toLowerCase() === "pending"
  ).length;

  const Approved = vendors.filter(
    (v) => v.status?.toLowerCase() === "Approved"
  ).length;

  const rejected = vendors.filter(
    (v) => v.status?.toLowerCase() === "rejected"
  ).length;

  return (
    <section className="stats-grid">
      <StatCard title="Pending" value={pending} />
      <StatCard title="Approved" value={Approved} />
      <StatCard title="Rejected" value={rejected} />

      <StatCard
        title="Applications Today"
        value={pending}
        subtitle={`• ${pending} New`}
        large
      />

      <StatCard title="Average Review Time" value={38} />
      <StatCard title="Open Complaints" value={18} />
    </section>
  );
}
