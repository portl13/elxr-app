import React from "react";

function CreatorSeeAllButton({ setTab, className }) {
  return (
    <button
      className={`no-btn align-items-center ${className}`}
      onClick={setTab}
    >
      <span className="font-size-14 color-font nowrap">See all</span>
    </button>
  );
}

export default CreatorSeeAllButton;
