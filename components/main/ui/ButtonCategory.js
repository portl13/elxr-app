import React from "react";

function ButtonCategory({ text, active, setCat }) {
  return (
    <div className="p-1">
      <button
        onClick={setCat}
        className={`text-capitalize d-flex justify-content-center category-btn nowrap ${
          active ? "active" : ""
        } pointer w-100`}
      >
        {text}
      </button>
    </div>
  );
}

export default ButtonCategory;
