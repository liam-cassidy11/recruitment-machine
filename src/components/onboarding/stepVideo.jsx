import React from "react";

export default function StepVideo({ data, updateField }) {
  const set = (key) => (e) => updateField(key, e.target.value);

  return (
    <div className="step">
      <p className="step-eyebrow">Game Film</p>
      <h2 className="step-title">Add your highlight video</h2>
      <p className="step-hint">
        A YouTube link works best. Don't have one yet? Skip this step and add it later.
      </p>

      <div className="field-grid">
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="videoUrl">Video URL</label>
          <input
            id="videoUrl"
            value={data.videoUrl || ""}
            onChange={set("videoUrl")}
            placeholder="https://youtube.com/watch?v=..."
          />
          <span className="field-hint">YouTube or Hudl link</span>
        </div>
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="hudlUrl">Hudl Profile (optional)</label>
          <input
            id="hudlUrl"
            value={data.hudlUrl || ""}
            onChange={set("hudlUrl")}
            placeholder="https://hudl.com/profile/..."
          />
        </div>
      </div>
    </div>
  );
}