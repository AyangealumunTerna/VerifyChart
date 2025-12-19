import { useState } from "react";
import "./ScamReportForm.css";

export default function ScamReportForm() {
  const [report, setReport] = useState("");

  const submitReport = (e) => {
    e.preventDefault();
    console.log("Scam report:", report);
  };

  return (
    <section className="scam-report">
      <div className="scam-report-container">
        <h2>Report <span id="red">scams</span> to help others</h2>

        <p className="scam-report-subtext">
          Help protect others by reporting fraudulent vendors or suspicious
          activities you’ve encountered.
        </p>

        <form onSubmit={submitReport} className="scam-report-form">
          <textarea
            placeholder="Describe what happened, include vendor handle, platform, and any evidence if possible…"
            value={report}
            onChange={(e) => setReport(e.target.value)}
          />

          <button type="submit">Submit Report</button>
        </form>
      </div>
    </section>
  );
}
