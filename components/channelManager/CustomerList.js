import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye} from "@fortawesome/free-solid-svg-icons";
import { TIMEOUT } from "../../utils/constant";
import { useAlert } from "react-alert";

const CustomerList = ({ customer,handleRedirect,cust,id }) => {
  const alert = useAlert();
    const { name,username,email,location,orders,money_spent,last_order_id,last_order_date} = customer
    return (
        <div className="column-head">
            <div className="customer-div-1">
                {name}
            </div>
            <div className="customer-div-2">
                {username}
            </div>
            <div className="customer-div-3">
                {email}
            </div>
            <div className="customer-div-4">
                {location}
            </div>
            <div className="customer-div-5">
                {orders}
            </div>
            <div className="customer-div-6">
                ${money_spent}.00
            </div>
            <div className="customer-div-7">
                #{last_order_id} {last_order_date}
            </div>
            <div className="customer-div-8" onClick={() => handleRedirect("customer-detail", id)}>
            <FontAwesomeIcon icon={faEye} />
            </div>
        </div>
    );
}

export default CustomerList
