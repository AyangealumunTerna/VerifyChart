import StatCard from "./StatCard";
import "./StatsGrid.css";

export default function StatsGrid() {
  return (
    <section className="stats-grid">
      <StatCard title="Pending" value={18} />
      <StatCard title="Approved" value={46} />
      <StatCard title="Rejected" value={10} />
      <StatCard
        title="Applications Today"
        value={27}
        subtitle="•13 New • 11 Approved • 3 Rejected"
        large
      />
      <StatCard title="Average Review Time" value={38} />
      <StatCard title="Open Complaints" value={18} />
    </section>
  );
}
