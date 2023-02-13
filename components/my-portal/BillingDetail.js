import React from "react";
function BillingDetail({ subscriberData }) {
  return (
    <>
      <div className="billing-panel">
        <div className="billing-head">
          <div className="left-panel">Billing Details</div>
          <div className="right-panel">Shipping Details</div>
        </div>
        <div className="billing-section">
          <div className="left-panel">
            <p>
              <span>Address:</span>
              {subscriberData.customer_billing_address.first_name}{" "}
              {subscriberData.customer_billing_address.last_name}
              <br />
              {subscriberData.customer_billing_address.company}
              {subscriberData.customer_billing_address.company && <br />}
              {subscriberData.customer_billing_address.address_1}
              <br />
              {subscriberData.customer_billing_address.city}
              {","}
              {subscriberData.customer_billing_address.state}{" "}
              {subscriberData.customer_billing_address.postcode}
            </p>
            <p>
              <span>Email:</span>
              <a href="mailto:support@elxr.com">{subscriberData.customer_billing_address.email}</a>
            </p>
            <p>
              <span>Phone:</span>
              {subscriberData.customer_billing_address.phone}
            </p>
            <p>
              <span>Payment Method:</span>
              {subscriberData.customer_payment_method_to_display}
            </p>
          </div>
          <div className="right-panel">
            <p>
              <span>Address:</span>
              {subscriberData.shipping_address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default BillingDetail;
