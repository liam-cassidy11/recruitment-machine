import React from "react";
import SectionHeading from "../shared/sectionHeading";

export default function Schedule({ athlete }) {
  const rows = athlete?.schedule || [];
  if (rows.length === 0) return null;

  return (
    <section id="schedule">
      <SectionHeading title="Upcoming Schedule" />
      {rows.map((g, i) => (
        <div className="schedule-row" key={i}>
          <div className="schedule-date">{g.date}</div>
          <div className="schedule-event">{g.event}</div>
          <div className="schedule-location">{g.location}</div>
        </div>
      ))}
    </section>
  );
}