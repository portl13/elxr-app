import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { UserContext } from "@context/UserContext";
import { getShippingAddress } from "@api/my-account/address.api";

function AddressCardShipping({ url }) {
  const { user } = useContext(UserContext);
  const [shippingAddress, setShippingAddress] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    phone: "",
  });
  function getShippingAddressData() {
    getShippingAddress(user).then((res) => {
      setShippingAddress(res.data.data);
    });
  }
  useEffect(() => getShippingAddressData(), []);
  return (
    <div className="right-content">
      <div className="wc-Address-title mb-3 font-size-22">SHIPPING ADDRESS</div>
      <div className="wc-address-details">
        <span className={"label-title"}>Name</span>
        <span className={"label-value"}>
          {shippingAddress?.first_name} {shippingAddress?.last_name}
        </span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Company name</span>
        <span className={"label-value"}>{shippingAddress?.company}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Street address 1</span>
        <span className={"label-value"}>{shippingAddress?.address_1}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Street address 2</span>
        <span className={"label-value"}>{shippingAddress?.address_2}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>City</span>
        <span className={"label-value"}>{shippingAddress?.city}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>State</span>
        <span className={"label-value"}>{shippingAddress?.state}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Postcode</span>
        <span className={"label-value"}>{shippingAddress?.postcode}</span>
      </div>
      <div className="wc-address-details">
        <span className={"label-title"}>Phone</span>
        <span className={"label-value"}>{shippingAddress?.phone}</span>
      </div>
      <div className={"text-right"}>
        <Link href={url}>
          <a>Edit</a>
        </Link>
      </div>
    </div>
  );
}

export default AddressCardShipping;
