import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepIndicator from "./stepIndicator";
import StepBasicInfo from "./stepBasicInfo";
import StepVideo from "./stepVideo";
import StepStats from "./stepStats";
import StepAcademics from "./stepAcademics";
import StepSchedule from "./stepSchedule";
import StepContact from "./stepContact";
import StepReview from "./stepReview";
import { supabase } from "../../lib/supabaseClient";

const STEP_LABELS = [
  "Basic Info", "Video", "Season Stats",
  "Academics", "Schedule", "Contact", "Review",
];

const BLANK_FORM = {
  name: "", slug: "", photoUrl: "", positions: [], gradYear: "", height: "", bats: "", throws: "",
  school: "", club: "", city: "",
  videoUrl: "", hudlUrl: "",
  seasonStats: [],
  academics: {},
  schedule: [],
  contact: {},
};

// Form state stays camelCase; database columns are snake_case.
// These two functions are the only place that translation happens.
function toDbFields(formData) {
  return {
    name: formData.name,
    slug: formData.slug,
    photo_url: formData.photoUrl,
    positions: formData.positions,
    grad_year: formData.gradYear,
    height: formData.height,
    bats: formData.bats,
    throws: formData.throws,
    school: formData.school,
    club: formData.club,
    city: formData.city,
    video_url: formData.videoUrl,
    hudl_url: formData.hudlUrl,
    season_stats: formData.seasonStats,
    academics: formData.academics,
    schedule: formData.schedule,
    contact: formData.contact,
  };
}

function fromDbRow(row) {
  return {
    name: row.name || "",
    slug: row.slug || "",
    photoUrl: row.photo_url || "",
    positions: row.positions || [],
    gradYear: row.grad_year || "",
    height: row.height || "",
    bats: row.bats || "",
    throws: row.throws || "",
    school: row.school || "",
    club: row.club || "",
    city: row.city || "",
    videoUrl: row.video_url || "",
    hudlUrl: row.hudl_url || "",
    seasonStats: row.season_stats || [],
    academics: row.academics || {},
    schedule: row.schedule || [],
    contact: row.contact || {},
  };
}

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [athleteId, setAthleteId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState(BLANK_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [slugStatus, setSlugStatus] = useState("idle"); // idle | checking | available | taken
  const navigate = useNavigate();

  // On mount: find the current user's existing athletes row (created at
  // signup) and load whatever they've already filled in.
  useEffect(() => {
    const loadAthlete = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      setUserId(user.id);

      const { data, error } = await supabase
        .from("athletes")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to load athlete profile:", error.message);
      } else if (data) {
        setAthleteId(data.id);
        setFormData(fromDbRow(data));
      }

      setLoading(false);
    };

    loadAthlete();
  }, [navigate]);

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const goToStep = (i) => setStep(i);

  // Only Basic Info is required to move forward — everything else can be
  // filled in partially and finished later.
  const canAdvance = () => {
    if (step === 0) {
      return Boolean(
        formData.name.trim() &&
        formData.positions.length > 0 &&
        formData.slug.trim() &&
        slugStatus === "available"
      );
    }
    return true;
  };

  // Save-as-you-go: called on every "Next" so nobody loses progress if
  // they close the tab mid-form.
  const saveProgress = async () => {
    if (!athleteId) return;
    setSaving(true);
    setSaveError(null);

    const { error } = await supabase
      .from("athletes")
      .update(toDbFields(formData))
      .eq("id", athleteId);

    setSaving(false);

    if (error) {
      setSaveError(error.message);
    }
  };

  const next = async () => {
    await saveProgress();
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const publish = async () => {
    await saveProgress();

    const { error } = await supabase
      .from("athletes")
      .update({ published: true })
      .eq("id", athleteId);

    if (error) {
      setSaveError(error.message);
      return;
    }

    navigate("/dashboard");
  };

  if (loading) return <p>Loading...</p>;

  const steps = [
    <StepBasicInfo
      data={formData}
      updateField={updateField}
      userId={userId}
      athleteId={athleteId}
      slugStatus={slugStatus}
      setSlugStatus={setSlugStatus}
    />,
    <StepVideo data={formData} updateField={updateField} />,
    <StepStats data={formData} updateField={updateField} />,
    <StepAcademics data={formData} updateField={updateField} />,
    <StepSchedule data={formData} updateField={updateField} />,
    <StepContact data={formData} updateField={updateField} />,
    <StepReview data={formData} goToStep={goToStep} />,
  ];

  return (
    <div className="onboarding-shell">
      <StepIndicator
        currentStep={step}
        totalSteps={STEP_LABELS.length}
        stepLabel={STEP_LABELS[step]}
      />

      {saveError && <p className="auth-error">Couldn't save: {saveError}</p>}

      {steps[step]}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={back} disabled={step === 0}>
          Back
        </button>
        {step < STEP_LABELS.length - 1 ? (
          <button className="btn btn-primary" onClick={next} disabled={!canAdvance() || saving}>
            {saving ? "Saving..." : "Next"}
          </button>
        ) : (
          <button className="btn btn-primary" onClick={publish} disabled={saving}>
            {saving ? "Publishing..." : "Publish Profile"}
          </button>
        )}
      </div>
    </div>
  );
}