import React from 'react'

function AddressCard({ result, handleRedirect, shippingAdress }) {
  return (
    <>
      <h2>Addresses</h2>
      <div className="address-sub-head">
        The following addresses will be used on the checkout page by default.
      </div>
      <div className="wc-myaddress-content">
        <div className="left-content">
          <div className="wc-Address-title">Billing address </div>
          <div className="wc-address-details">
            {result?.first_name} {result?.last_name}
          </div>
          <div className="wc-address-details">{result?.company}</div>
          <div className="wc-address-details">{result?.address_1}</div>
          <div className="wc-address-details">{result?.address_2}</div>
          <div className="wc-address-details">{result?.city}</div>
          <div className="wc-address-details">{result?.state}</div>
          <div className="wc-address-details">{result?.postcode}</div>
          <div className="wc-address-details">{result?.phone}</div>
          <div className="wc-address-details">{result?.email}</div>

          <button
            className="edit-text"
            onClick={() => handleRedirect('billing-address')}
          >
            Edit
          </button>
        </div>
        <div className="right-content">
          <div className="wc-Address-title">SHIPPING ADDRESS </div>
          <div className="wc-address-details">
            {shippingAdress?.first_name} {shippingAdress?.last_name}
          </div>
          <div className="wc-address-details">{shippingAdress?.company}</div>
          <div className="wc-address-details">{shippingAdress?.address_1}</div>
          <div className="wc-address-details">{shippingAdress?.address_2}</div>
          <div className="wc-address-details">{shippingAdress?.city}</div>
          <div className="wc-address-details">{shippingAdress?.state}</div>
          <div className="wc-address-details">{shippingAdress?.postcode}</div>
          <div className="wc-address-details">{shippingAdress?.phone}</div>
          <button
            className="edit-text"
            onClick={() => handleRedirect('shipping-address')}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  )
}
export default AddressCard
