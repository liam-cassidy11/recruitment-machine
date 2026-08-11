import React from "react";
import SectionHeading from "../shared/sectionHeading";

export default function Stats({ athlete }) {
  const rows = athlete?.season_stats || [];
  if (rows.length === 0) return null;

  return (
    <section id="stats">
      <SectionHeading eyebrow="Scorebook" title="Season Stats" />
      <table className="stats-table">
        <thead>
          <tr>
            <th>Season</th><th>GP</th><th>AB</th><th>BA</th><th>R</th><th>H</th><th>RBI</th><th>2B</th><th>3B</th><th>HR</th><th>IP</th><th>ERA</th><th>K</th><th>WIN</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={i}>
              <td>{s.year}</td><td>{s.gp}</td><td>{s.ab}</td><td>{s.ba}</td>
              <td>{s.r}</td><td>{s.h}</td><td>{s.rbi}</td><td>{s.db}</td>
              <td>{s.trp}</td><td>{s.hr}</td><td>{s.ip}</td>
              <td>{s.era}</td><td>{s.k}</td><td>{s.win}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}