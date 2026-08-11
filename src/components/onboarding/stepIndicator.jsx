import React from "react";


export default function StepIndicator({ currentStep, totalSteps, stepLabel }) {
  return (
    <div>
      <p className="indicator-label">
        Step {currentStep + 1} of {totalSteps} — {stepLabel}
      </p>
      <div className="indicator">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`indicator-dot ${
              i === currentStep ? "active" : i < currentStep ? "done" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}