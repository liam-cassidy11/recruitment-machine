import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const POSITIONS = ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "Utility"];

// Strip anything that isn't a lowercase letter, number, or hyphen,
// so the slug is always URL-safe as the user types.
function sanitizeSlug(raw) {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function StepBasicInfo({
  data, updateField, userId, athleteId, slugStatus, setSlugStatus,
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const set = (key) => (e) => updateField(key, e.target.value);

  const positions = data.positions || [];
  const togglePosition = (p) => {
    const next = positions.includes(p)
      ? positions.filter((x) => x !== p)
      : [...positions, p];
    updateField("positions", next);
  };

  const handleSlugChange = (e) => {
    const clean = sanitizeSlug(e.target.value);
    updateField("slug", clean);
    setSlugStatus("idle"); // typing again invalidates the last check
  };

  const checkSlugAvailability = async () => {
    const slug = data.slug.trim();
    if (!slug) return;

    setSlugStatus("checking");

    const { data: existing, error } = await supabase
      .from("athletes")
      .select("id")
      .eq("slug", slug)
      .neq("id", athleteId) // ignore this athlete's own current row
      .maybeSingle();

    if (error) {
      setSlugStatus("idle");
      return;
    }

    setSlugStatus(existing ? "taken" : "available");
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    setUploading(true);
    setUploadError(null);

    const ext = file.name.split(".").pop();
    const path = `${userId}/profile.${ext}`;

    const { error: uploadErr } = await supabase.storage
      .from("athlete-photos")
      .upload(path, file, { upsert: true });

    if (uploadErr) {
      setUploading(false);
      setUploadError(uploadErr.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("athlete-photos")
      .getPublicUrl(path);

    const freshUrl = `${publicUrlData.publicUrl}?t=${Date.now()}`;
    updateField("photoUrl", freshUrl);
    setUploading(false);
  };

  return (
    <div className="step">
      <p className="step-eyebrow">Basic Info</p>
      <h2 className="step-title">Let's start with the basics</h2>
      <p className="step-hint">This is what shows up at the top of your profile.</p>

      <div className="field-grid">
        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>Profile Photo</label>
          <div className="photo-upload-row">
            {data.photoUrl && (
              <img src={data.photoUrl} alt="Profile preview" className="photo-preview" />
            )}
            <div>
              <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploading} />
              {uploading && <span className="field-hint">Uploading...</span>}
              {uploadError && <p className="auth-error">{uploadError}</p>}
            </div>
          </div>
        </div>

        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" value={data.name || ""} onChange={set("name")} placeholder="FirstName LastName" />
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="slug">Your Profile URL</label>
          <div className="slug-input-row">
            <span className="slug-prefix">What would you like your url to read?</span>
            <input
              id="slug"
              value={data.slug || ""}
              onChange={handleSlugChange}
              onBlur={checkSlugAvailability}
            />
          </div>
          <p className="slug-preview">
            Your link: <strong>/athlete/{data.slug || "…"}</strong>
          </p>
          {slugStatus === "checking" && <span className="field-hint">Checking availability...</span>}
          {slugStatus === "available" && <span className="slug-status available">✓ Available</span>}
          {slugStatus === "taken" && <span className="slug-status taken">✕ Already taken — try another</span>}
          <span className="field-hint">Lowercase letters, numbers, and hyphens only.</span>
        </div>

        <div className="field" style={{ gridColumn: "1 / -1" }}>
          <label>Position(s)</label>
          <div className="checkbox-group">
            {POSITIONS.map((p) => (
              <label key={p} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={positions.includes(p)}
                  onChange={() => togglePosition(p)}
                />
                {p}
              </label>
            ))}
          </div>
          <span className="field-hint">Select every position you play.</span>
        </div>
        <div className="field">
          <label htmlFor="gradYear">Graduation Year</label>
          <input id="gradYear" value={data.gradYear || ""} onChange={set("gradYear")} placeholder="2027" />
        </div>
        <div className="field">
          <label htmlFor="height">Height</label>
          <input id="height" value={data.height || ""} onChange={set("height")} placeholder={`5'7"`} />
        </div>
        <div className="field">
          <label htmlFor="bats">Bats</label>
          <select id="bats" value={data.bats || ""} onChange={set("bats")}>
            <option value="">--</option>
            <option value="R">Right</option>
            <option value="L">Left</option>
            <option value="S">Switch</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="throws">Throws</label>
          <select id="throws" value={data.throws || ""} onChange={set("throws")}>
            <option value="">--</option>
            <option value="R">Right</option>
            <option value="L">Left</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="school">High School</label>
          <input id="school" value={data.school || ""} onChange={set("school")} placeholder="High School" />
        </div>
        <div className="field">
          <label htmlFor="club">Club Team</label>
          <input id="club" value={data.club || ""} onChange={set("club")} placeholder="Club team" />
        </div>
        <div className="field">
          <label htmlFor="city">City / State</label>
          <input id="city" value={data.city || ""} onChange={set("city")} placeholder="Poughkeepsie, NY" />
        </div>
      </div>
    </div>
  );
}