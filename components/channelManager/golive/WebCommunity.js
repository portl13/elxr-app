import React from "react";
function WebCommunity({ setStatus }) {
  return (
    <>
      <div className="details-data-section">
        <h2>Community Settings</h2>
        <div className="description-section">
          <span>Moderators (required)</span>
          <textarea placeholder="Add moderator"></textarea>
        </div>
        <label className="label-text">
          Paste the channel URL of a user to add as a moderator.
        </label>
        <div className="description-section">
          <span>Blocked words</span>
          <textarea placeholder="Add blocked words"></textarea>
        </div>
        <label className="label-text">Enter comma-seperated values</label>
        <div className="custom-checkbox checkbox-panel">
          <input className="custom-control-input" type="checkbox" />
          <label className="custom-control-label">Block links</label>
        </div>
      </div>

      <div className="button-section">
        <button onClick={() => setStatus("customization")}>Back</button>
      </div>
    </>
  );
}
export default WebCommunity;
