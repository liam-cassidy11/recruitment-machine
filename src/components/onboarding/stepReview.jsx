import React from "react";


export default function StepReview({ data, goToStep }) {
  return (
    <div className="step">
      <p className="step-eyebrow">Almost done</p>
      <h2 className="step-title">Review your profile</h2>
      <p className="step-hint">Double check everything, then hit publish.</p>

      <div className="review-section">
        <h3>Basic Info <button className="review-edit-link" onClick={() => goToStep(0)}>Edit</button></h3>
        <div className="review-row"><span>Name</span><span>{data.name || "—"}</span></div>
        <div className="review-row"><span>Position(s)</span><span>{data.positions?.length ? data.positions.join(", ") : "—"}</span></div>
        <div className="review-row"><span>Grad Year</span><span>{data.gradYear || "—"}</span></div>
        <div className="review-row"><span>School</span><span>{data.school || "—"}</span></div>
      </div>

      <div className="review-section">
        <h3>Video <button className="review-edit-link" onClick={() => goToStep(1)}>Edit</button></h3>
        <div className="review-row"><span>Highlight URL</span><span>{data.videoUrl || "Not added"}</span></div>
      </div>

      <div className="review-section">
        <h3>Season Stats <button className="review-edit-link" onClick={() => goToStep(2)}>Edit</button></h3>
        {(data.seasonStats || []).length === 0 && (
          <div className="review-row"><span>—</span><span>None added</span></div>
        )}
        {(data.seasonStats || []).map((s, i) => (
          <div className="review-row" key={i}>
            <span>{s.year || `Season ${i + 1}`}</span>
            <span>{s.avg || "—"} AVG</span>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h3>Measurables <button className="review-edit-link" onClick={() => goToStep(3)}>Edit</button></h3>
        <div className="review-row"><span>Exit Velo</span><span>{data.measurables?.exitVelo || "—"}</span></div>
        <div className="review-row"><span>60-Yard</span><span>{data.measurables?.sixtyTime || "—"}</span></div>
      </div>

      <div className="review-section">
        <h3>Academics <button className="review-edit-link" onClick={() => goToStep(4)}>Edit</button></h3>
        <div className="review-row"><span>GPA</span><span>{data.academics?.gpa || "—"}</span></div>
      </div>

      <div className="review-section">
        <h3>Schedule <button className="review-edit-link" onClick={() => goToStep(5)}>Edit</button></h3>
        {(data.schedule || []).length === 0 && (
          <div className="review-row"><span>—</span><span>None added</span></div>
        )}
        {(data.schedule || []).map((s, i) => (
          <div className="review-row" key={i}>
            <span>{s.date || "—"}</span>
            <span>{s.event || "—"}</span>
          </div>
        ))}
      </div>

      <div className="review-section">
        <h3>Contact <button className="review-edit-link" onClick={() => goToStep(6)}>Edit</button></h3>
        <div className="review-row"><span>Email</span><span>{data.contact?.email || "—"}</span></div>
        <div className="review-row"><span>Phone</span><span>{data.contact?.phone || "—"}</span></div>
      </div>
    </div>
  );
}