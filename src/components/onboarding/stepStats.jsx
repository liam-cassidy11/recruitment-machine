import React from "react";

const BLANK_ROW = { year: "", gp: "", ba: "", ab: "", r: "", h: "", rbi: "", db:"", trp:"", hr:"", ip:"", era:"", k:"", win:""};

const FIELDS = [
  { key: "year", label: "Season" },
  { key: "gp", label: "GP" },
  { key: "ba", label: "BA" },
  { key: "ab", label: "AB" },
  { key: "r", label: "R" },
  { key: "h", label: "H" },
  { key: "rbi", label: "RBI" },
  { key: "db", label: "2B" },
  { key: "trp", label: "3B" },
  { key: "hr", label: "HR" },
  { key: "ip", label: "IP" },
  { key: "era", label: "ERA" },
  { key: "k", label: "K" },
  { key: "win", label: "WIN" },
];

export default function StepStats({ data, updateField }) {
  const rows = data.seasonStats?.length ? data.seasonStats : [];

  const updateRow = (index, key, value) => {
    const next = rows.map((row, i) => (i === index ? { ...row, [key]: value } : row));
    updateField("seasonStats", next);
  };

  const addRow = () => updateField("seasonStats", [...rows, { ...BLANK_ROW }]);
  const removeRow = (index) => updateField("seasonStats", rows.filter((_, i) => i !== index));

  return (
    <div className="step">
      <p className="step-eyebrow">Scorebook</p>
      <h2 className="step-title">Season Stats</h2>
      <p className="step-hint">
        Add one row per season. Leave a field blank if you don't have that number yet.
      </p>

      {rows.length === 0 && <p className="step-empty">No seasons added yet.</p>}

      {rows.map((row, index) => (
        <div className="stat-row" key={index}>
          {FIELDS.map((f) => (
            <label className="stat-field" key={f.key}>
              <span className="stat-field-label">{f.label}</span>
              <input
                type="text"
                value={row[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => updateRow(index, f.key, e.target.value)}
              />
            </label>
          ))}
          <button
            type="button"
            className="remove-btn"
            style={{ position: "static" }}
            onClick={() => removeRow(index)}
            aria-label={`Remove season ${index + 1}`}
          >
            ✕
          </button>
        </div>
      ))}

      <button type="button" className="add-btn" onClick={addRow}>
        + Add Season
      </button>
    </div>
  );
}