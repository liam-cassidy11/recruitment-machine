import React from "react";


const BLANK_ROW = { date: "", event: "", location: "" };

export default function StepSchedule({ data, updateField }) {
  const rows = data.schedule?.length ? data.schedule : [];

  const updateRow = (index, key, value) => {
    const next = rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    updateField("schedule", next);
  };

  const addRow = () => updateField("schedule", [...rows, { ...BLANK_ROW }]);
  const removeRow = (index) => updateField("schedule", rows.filter((_, i) => i !== index));

  return (
    <div className="step">
      <h2 className="step-title">Upcoming Schedule</h2>
      <p className="step-hint">Tournaments and showcases coaches can come see you at.</p>

      {rows.length === 0 && <p className="step-empty">No events added yet.</p>}

      {rows.map((row, index) => (
        <div className="row-card" key={index}>
          <button
            type="button"
            className="remove-btn"
            onClick={() => removeRow(index)}
            aria-label={`Remove event ${index + 1}`}
          >
            ✕
          </button>
          <div className="field-grid">
            <div className="field">
              <label>Date</label>
              <input value={row.date} onChange={(e) => updateRow(index, "date", e.target.value)} placeholder="Aug 15-17" />
            </div>
            <div className="field">
              <label>Event</label>
              <input value={row.event} onChange={(e) => updateRow(index, "event", e.target.value)} placeholder="Softball Tournament" />
            </div>
            <div className="field">
              <label>Location</label>
              <input value={row.location} onChange={(e) => updateRow(index, "location", e.target.value)} placeholder="Wappingers Falls, NY" />
            </div>
          </div>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addRow}>
        + Add Event
      </button>
    </div>
  );
}