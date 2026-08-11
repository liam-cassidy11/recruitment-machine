import React from "react";

export default function StepAcademics({ data, updateField }) {
  const academics = data.academics || {};

  const set = (key) => (e) => {
    updateField("academics", { ...academics, [key]: e.target.value });
  };

  return (
    <div className="step">
      <p className="step-eyebrow">Off the Field</p>
      <h2 className="step-title">Academics</h2>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="gpa">GPA</label>
          <input id="gpa" value={academics.gpa || ""} onChange={set("gpa")} placeholder="3.9" />
        </div>
        <div className="field">
          <label htmlFor="testScore">Test Score</label>
          <input id="testScore" value={academics.testScore || ""} onChange={set("testScore")} placeholder="1310 SAT" />
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="major">Intended Major</label>
          <input id="major" value={academics.major || ""} onChange={set("major")} placeholder="Kinesiology" />
        </div>
      </div>
    </div>
  );
}