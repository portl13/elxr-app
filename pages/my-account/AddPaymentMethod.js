import React from "react";
function AddPaymentMethod() {
  return (
    <>
      <div className="payment-method-screen">
        <div className="card-access-tag">
          <input type="radio" />
          Credit Card (Stripe)
        </div>
        <div className="payment-mode-wrapper">
          <p>Pay with your credit card via Stripe.</p>
          <div className="credit-card-text">Credit or debit card</div>
          <div className="card-input"></div>
        </div>
        <div className="btn-tag">
          <button className="payment-button">Add payment method</button>
        </div>
      </div>
    </>
  );
}
export default AddPaymentMethod;
