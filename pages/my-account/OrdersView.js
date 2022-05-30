import React, { useState, useEffect } from "react";
import moment from "moment";

function Ordersview({ orderItem, id, handleRedirect }) {
    return (
        <>
            <div className="column-head">
                <div className="order-list-1">#{orderItem?.id}</div>
                <div className="order-list-2">{moment(orderItem?.date).format("MMMM DD, YYYY")}</div>
                <div className="order-list-3">{orderItem?.status.charAt(0).toUpperCase() + orderItem?.status.slice(1)}</div>
                <div className="order-list-4">${orderItem?.total} for {orderItem?.quantity} item</div>
                <div className="order-list-5"><button onClick={() => handleRedirect("orders-view", id)}> View</button></div>
            </div>

        </>
    )
}

export default Ordersview;