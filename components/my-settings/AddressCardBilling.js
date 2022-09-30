import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@context/UserContext";
import { getAddress } from "@api/my-account/address.api";

function AddressCardBilling({ url }) {
  const { user } = useContext(UserContext);
  const [billingAddress, setBillingAddress] = useState();
  function getAddressDetail() {
    getAddress(user)
      .then((res) => setBillingAddress(res.data.data))
      .catch((error) => console.log(error));
  }
  useEffect(() => getAddressDetail(), []);
  return (
    <div className="left-content">
      <div className="wc-address-title mb-3 font-size-22">Billing address</div>
      <div className="wc-address-details">
        <span className={"label-title"}>Name</span>
        <span className={"label-value"}>
          {billingAddress?.first_name} {billingAddress?.last_name}
        </span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Company name</span>
        <span className={"label-value"}>{billingAddress?.company}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Street address 1</span>
        <span className={"label-value"}>{billingAddress?.address_1}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Street address 2</span>
        <span className={"label-value"}>{billingAddress?.address_2}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>City</span>
        <span className={"label-value"}>{billingAddress?.city}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>State</span>
        <span className={"label-value"}>{billingAddress?.state}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Postcode</span>
        <span className={"label-value"}>{billingAddress?.postcode}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Phone</span>
        <span className={"label-value"}>{billingAddress?.phone}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Email</span>
        <span className={"label-value"}>{billingAddress?.email}</span>
      </div>
      <div className={"text-right"}>
        <Link href={url}>
          <a>Edit</a>
        </Link>
      </div>
    </div>
  );
}

export default AddressCardBilling;
