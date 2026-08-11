import React from "react";

// value: the big number/text, label: what it's measuring, unit: optional (mph, sec, in)
export default function StatCard({ value, label, unit }) {
  return (
    <div className="stat-card">
      <div className="stat-card-value">
        {value || "—"}
        {unit && <span className="stat-card-unit"> {unit}</span>}
      </div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
}