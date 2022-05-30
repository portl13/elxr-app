import React from "react";
function Description({ result }) {
  const extractContent = (s) => {
    var span = document.createElement("span");
    span.innerHTML = s;
    return span.textContent || span.innerText;
  };
  return (
    <>
      <div className="description-wrappper">
        <h2>Description</h2>
        {result?.description && <p>{extractContent(result?.description)}</p>}
      </div>
    </>
  );
}
export default Description;
