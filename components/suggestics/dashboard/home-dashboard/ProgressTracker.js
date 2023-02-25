/* eslint-disable react/jsx-filename-extension */
import router from "next/router";
import React from "react";

function ProgressTracker() {
  return (
    <div className="dashboard-card">
      <div
        className="card-enter-btn"
        onClick={() => router.push("/progressTracker")}
      >
        <img src="/img/card-arrow.svg" alt="img" />
      </div>
      <div className="dashboard-card-subtitle">meals &amp; calorie board</div>
      <div className="dashboard-card-title">Progress Tracker</div>
      <div className="progress-tracker-wrap">
        <div className="progress-tracker-img">
          <img src="/img/progress-bar-circle.png" alt="img" />
        </div>
        <div>
          <div className="progress-title">43/200</div>
          <div className="progress-subtitle">Kcal consumed today</div>
          <div className="progress-bar-label">
            <span className="label-col pink" />
            <span className="label-text">Carbs (20/100 gm)</span>
          </div>
          <div className="progress-bar-label">
            <span className="label-col blue" />
            <span className="label-text">Fat (0.02/1 gm)</span>
          </div>
          <div className="progress-bar-label">
            <span className="label-col red" />
            <span className="label-text">Protein (23/30 gm)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracker;
