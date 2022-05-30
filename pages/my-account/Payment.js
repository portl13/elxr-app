import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
function Payment({ user, handleRedirect }) {
  return (
    <>
      <div className="wc-subscription-info">
        <FontAwesomeIcon icon={faClock} />
        No saved methods found.
      </div>
      <button
        className="payment-btn"
        onClick={() => handleRedirect("add-payment-method")}
      >
        Add payment method
      </button>
    </>
  );
}
export default Payment;
