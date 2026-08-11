import React from "react";
import SectionHeading from "../shared/sectionHeading";

export default function Academics({ athlete }) {
  const a = athlete?.academics || {};
  if (!a.gpa && !a.testScore && !a.major) return null;

  return (
    <section id="academics">
      <SectionHeading eyebrow="Off the Field" title="Academics" />
      <div className="academics-grid">
        <div><div className="academics-value">{a.gpa || "—"}</div><div className="academics-label">GPA</div></div>
        <div><div className="academics-value">{a.testScore || "—"}</div><div className="academics-label">Test Score</div></div>
        <div><div className="academics-value">{a.major || "—"}</div><div className="academics-label">Intended Major</div></div>
      </div>
    </section>
  );
}