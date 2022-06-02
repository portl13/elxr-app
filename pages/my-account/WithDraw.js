import React from "react";
function WithDraw() {
  return (
    <>
      <div className="woocommerce-error">
        <span className="woocommerce-error-tag">
          <a href="">Click here</a> to setup bank account details.
        </span>
      </div>
      <div className="col-panel">
        <div className="col-12-tag">
          <label>USD</label>
          <input type="" />
        </div>
        <div className="col-12-tag">
          <label>Bank Transfer</label>
          <input type="" />
        </div>
        <div className="col-12-tag">
          <button>Submit Request</button>
        </div>
      </div>
    </>
  );
}
export default WithDraw;
