import React from "react";

function AboutTab({ vendor_description }) {
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">ABOUT</h4>
      </div>
      {vendor_description && (
        <div dangerouslySetInnerHTML={{ __html: vendor_description }} />
      )}
    </div>
  );
}

export default AboutTab;
