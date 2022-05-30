import React, { useState, useEffect } from "react";
import moment from "moment";

function RecentOrder({ orderItem, id, handleRedirect }) {
    return (
        <>
            <div className="column-head">
                <div className="recent-col-1">#{orderItem?.id}</div>
                <div className="recent-col-2">{moment(orderItem?.date).format("MMMM DD, YYYY")}</div>
                <div className="recent-col-3">{orderItem?.status.charAt(0).toUpperCase() + orderItem?.status.slice(1)}</div>
                <div className="recent-col-4">${orderItem?.total} for 1 item</div>
                <div className="recent-col-5"><button onClick={() => handleRedirect("orders-view", id)}> View</button></div>
            </div>


        </>
    )
}

export default RecentOrder;