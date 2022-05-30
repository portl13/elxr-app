import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faCheck } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";

function CustomerOrders({ orderList, handleRedirect, id }) {

    const alert = useAlert();
    const name = orderList.items.products.map((item) => item.name);
    return (
        <>
            <div className="column-head">
                <div className="customer-detail-div-1">
                <span className="tick-tag">
                    <FontAwesomeIcon icon={faCheck} />
                    <span className="tooltip-panel">
                        {orderList.order_status} 
                        <em></em>
                    </span>
                </span>
                </div>
                <div className="customer-detail-div-2">
                    #{orderList.order_id} by {orderList.name}
                </div>
                <div className="customer-detail-div-3">
                    <span> {orderList.items.quantity} item</span>
                    {orderList.items.quantity} {name} 
                </div>
                <div className="customer-detail-div-4">
                    ${orderList.total}.00 
                </div>
                <div className="customer-detail-div-5">
                    {moment(orderList.created.date).format("MMMM DD, YYYY")} 
                </div>
                <div className="customer-detail-div-6" onClick={() => handleRedirect("order-detail", id)}>
                    <FontAwesomeIcon icon={faEye} />
                </div>

            </div>
        </>
    )
}

export default CustomerOrders;

