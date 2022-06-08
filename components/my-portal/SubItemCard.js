import React from "react";
function SubItemCard({ subData }) {
  return (
    <>
      <div className="billing-subtotal-panel">
        <div className="billing-subtotal-ui">
          <span className="subtotal-tag">Subtotal:</span>
          <span className="amount-tag">${subData.discount}.00</span>
        </div>
        <div className="billing-subtotal-ui">
          <span className="subtotal-tag">Gross Total:</span>
          <span className="amount-tag">${subData.discount}.00</span>
        </div>
        <div className="billing-subtotal-ui">
          <span className="subtotal-tag">Total Earning:</span>
          <span className="amount-tag">${subData.discount}.00</span>
        </div>
        <div className="billing-subtotal-ui">
          <span className="subtotal-tag">Admin Fee:</span>
          <span className="amount-tag">${subData.discount}.00</span>
        </div>
      </div>
    </>
  );
}
export default SubItemCard;
