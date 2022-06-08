import React from "react";

function DashboardShippingcard({shippingAdress}) {
    return (
        <>
            <div className="wc-address-details">
                <span>{shippingAdress?.first_name} {shippingAdress?.last_name}</span>
                <span>{shippingAdress?.company}</span>
                <span>{shippingAdress?.address_1}</span>
                <span>{shippingAdress?.address_2}</span>
                <span>{shippingAdress?.city}</span>
                <span>{shippingAdress?.state}</span>
                <span>{shippingAdress?.postcode}</span>
                <span>{shippingAdress?.phone}</span>
            </div>
        </>
    )
}

export default DashboardShippingcard