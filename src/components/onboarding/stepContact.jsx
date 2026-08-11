import React from "react";


export default function StepContact({ data, updateField }) {
  const contact = data.contact || {};

  const set = (key) => (e) => {
    updateField("contact", { ...contact, [key]: e.target.value });
  };

  return (
    <div className="step">
      <p className="step-eyebrow">Get In Touch</p>
      <h2 className="step-title">Contact Info</h2>
      <p className="step-hint">
        Some families list a parent's info instead of the athlete's — either is fine.
      </p>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={contact.email || ""} onChange={set("email")} placeholder="emailname@email.com" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" value={contact.phone || ""} onChange={set("phone")} placeholder="(123) 456-7890" />
        </div>
        <div className="field">
          <label htmlFor="coachName">Coach Name (optional)</label>
          <input id="coachName" value={contact.coachName || ""} onChange={set("coachName")} placeholder="Coach Firstname Lastname" />
        </div>
        <div className="field">
          <label htmlFor="coachPhone">Coach Phone (optional)</label>
          <input id="coachPhone" value={contact.coachPhone || ""} onChange={set("coachPhone")} placeholder="(123) 456-7890" />
        </div>
        <div className="field">
          <label htmlFor="twitter">Twitter / X (optional)</label>
          <input id="twitter" value={contact.twitter || ""} onChange={set("twitter")} placeholder="@twitteraccount" />
        </div>
      </div>
    </div>
  );
}