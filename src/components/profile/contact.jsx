import React from "react";
import SectionHeading from "../shared/sectionHeading";

export default function Contact({ athlete }) {
  const c = athlete?.contact || {};

  return (
    <section id="contact">
      <SectionHeading eyebrow="Get In Touch" title="Contact" />
      <div className="contact-grid">
        {c.email && (
          <div><div className="contact-label">Email</div><a href={`mailto:${c.email}`}>{c.email}</a></div>
        )}
        {c.phone && (
          <div><div className="contact-label">Phone</div><div>{c.phone}</div></div>
        )}
        {c.coachName && (
          <div>
            <div className="contact-label">Coach</div>
            <div>{c.coachName}{c.coachPhone ? ` · ${c.coachPhone}` : ""}</div>
          </div>
        )}
        {athlete?.hudl_url && (
          <div>
            <div className="contact-label">Hudl</div>
            <a href={athlete.hudl_url} target="_blank" rel="noreferrer">View Profile →</a>
          </div>
        )}
        {c.twitter && (
          <div><div className="contact-label">Twitter / X</div><div>{c.twitter}</div></div>
        )}
      </div>
    </section>
  );
}