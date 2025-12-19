import "./StatsBar.css";

export default function StatsBar() {
  return (
    <section className="stats">
      <div className="stat-card">
        <p>Social media handles queried</p>
        <h3>4260</h3>
      </div>

      <div className="stat-card">
        <p>Social media handles verified</p>
        <h3>3780</h3>
      </div>

      <div className="stat-card">
        <p>Total Scam social media handle</p>
        <h3>5840</h3>
      </div>
    </section>
  );
}
