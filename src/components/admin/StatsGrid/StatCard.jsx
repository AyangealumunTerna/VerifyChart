import AnimatedCounter from "../AnimatedCounter";

export default function StatCard({ title, value, subtitle, large }) {
  return (
    <div className={`stat-card ${large ? "large" : ""}`}>
      <p>{title}</p>
      <AnimatedCounter value={value} />
      {subtitle && <small>{subtitle}</small>}
    </div>
  );
}
