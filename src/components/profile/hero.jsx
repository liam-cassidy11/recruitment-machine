import React from "react";
import StatCard from "../shared/statCard";

// athlete: the full row fetched from Supabase for this profile.
export default function Hero({ athlete }) {
  if (!athlete) return null;

  // Same safe-fallback pattern as Stats.jsx: default to an empty array
  // first, THEN index into it — never chain .length off a value that
  // might still be undefined.
  const seasonStats = athlete?.season_stats || [];
  const latestSeason = seasonStats[seasonStats.length - 1];

  return (
    <header className="hero">
        {athlete.photo_url && (
        <div className="hero-photo-wrap">
          <img src={athlete.photo_url} alt={athlete.name} className="hero-photo" />
        </div>
      )}
      <h1 className="hero-name">{athlete.name}</h1>
      <p className="hero-meta">
        {(athlete.positions || []).join(" / ")} · Class of {athlete.grad_year} · {athlete.height} ·{" "}
        B/T: {athlete.bats}/{athlete.throws} · {athlete.school}
      </p>

      <div className="hero-stat-row">
        <StatCard value={latestSeason?.ab} label="AB" />
        <StatCard value={latestSeason?.ba} label="BA" />
        <StatCard value={latestSeason?.rbi} label="RBI" />
        <StatCard value={latestSeason?.r} label="R" />
        <StatCard value={athlete.academics?.gpa} label="GPA" />
      </div>
    </header>
  );
}