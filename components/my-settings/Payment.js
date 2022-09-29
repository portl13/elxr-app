import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
function Payment({ user, handleRedirect }) {
  return (
    <section className="wcfm-collapse bsdatasection w-100">
      <div className="wc-subscription-info">
        <FontAwesomeIcon icon={faClock} />
        No saved methods found.
      </div>
      <Link href={'/settings/payment-method/add'}>
        <a
          className="payment-btn"
        >
          Add payment method
        </a>
      </Link>
    </section>
  );
}
export default Payment;
