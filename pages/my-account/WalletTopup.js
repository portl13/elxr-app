import React from "react";

function WalletTopup() {
  return (
    <>
      <div className="woo-wallet-add-amount">
        <div className="col-tag">
          <label>Enter amount</label>
          <input type="number" />
        </div>
        <div className="btn-tag">
          <button>Add</button>
        </div>
      </div>
    </>
  );
}
export default WalletTopup;
