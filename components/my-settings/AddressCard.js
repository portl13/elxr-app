import React from "react";
import AddressCardBilling from "@components/my-settings/AddressCardBilling";
import AddressCardShipping from "@components/my-settings/AddressCardShipping";

function AddressCard() {
  return (
    <>
      <h2>Addresses</h2>
      <div className="address-sub-head mb-4">
        The following addresses will be used on the checkout page by default.
      </div>
      <div className="wc-myaddress-content row">
        <div className="col-12 col-md-6">
          <AddressCardBilling url={"/settings/address/billing-address"} />
        </div>
        <div className="col-12 col-md-6">
          <AddressCardShipping url={"/settings/address/shipping-address"} />
        </div>
      </div>
    </>
  );
}
export default AddressCard;
