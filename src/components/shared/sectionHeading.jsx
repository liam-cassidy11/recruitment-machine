import React from "react";

// Reused above every profile section: Stats, Video, Schedule, etc.
export default function SectionHeading({ eyebrow, title }) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
      <h2 className="section-title">{title}</h2>
    </div>
  );
}