import React from "react";
import SectionHeading from "../shared/sectionHeading";

const HITTING_FIELDS = [
  { key: "gp", label: "GP" },
  { key: "ab", label: "AB" },
  { key: "ba", label: "BA" },
  { key: "r", label: "R" },
  { key: "h", label: "H" },
  { key: "rbi", label: "RBI" },
  { key: "db", label: "2B" },
  { key: "trp", label: "3B" },
  { key: "hr", label: "HR" },
];

const PITCHING_FIELDS = [
  { key: "ip", label: "IP" },
  { key: "era", label: "ERA" },
  { key: "k", label: "K" },
  { key: "win", label: "WIN" },
];

function StatTable({ rows, fields }) {
  return (
    <div className="stats-table-scroll">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Season</th>
            {fields.map((f) => <th key={f.key}>{f.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((s, i) => (
            <tr key={i}>
              <td>{s.year}</td>
              {fields.map((f) => <td key={f.key}>{s[f.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Stats({ athlete }) {
  const rows = athlete?.season_stats || [];
  if (rows.length === 0) return null;

  // Only show the pitching table if at least one season actually has
  // pitching numbers filled in — no point showing an empty table for
  // a position player who's never pitched.
  const hasPitchingStats = rows.some(
    (s) => s.ip || s.era || s.k || s.win
  );

  return (
    <section id="stats">
      <SectionHeading eyebrow="Scorebook" title="Season Stats" />

      <h3 className="stats-subheading">Hitting</h3>
      <StatTable rows={rows} fields={HITTING_FIELDS} />

      {hasPitchingStats && (
        <>
          <h3 className="stats-subheading">Pitching</h3>
          <StatTable rows={rows} fields={PITCHING_FIELDS} />
        </>
      )}
    </section>
  );
}