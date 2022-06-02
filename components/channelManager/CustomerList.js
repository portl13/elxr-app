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
            <div className="customer-div-1" data-label="Name">
                <span>
                    {name}
                </span>
            </div>
            <div className="customer-div-2"  data-label="Username">
               <span>
                    {username}
                </span>
            </div>
            <div className="customer-div-3" data-label="Email">
               <span>
                {email}
               </span>
            </div>
            <div className="customer-div-4" data-label="Location">
              <span>
                {location}
              </span>
            </div>
            <div className="customer-div-5" data-label="Orders">
               <span>
                {orders}
               </span>
            </div>
            <div className="customer-div-6" data-label="Money Spent">
               <span>
                ${money_spent}.00
               </span>
            </div>
            <div className="customer-div-7" data-label="Last Order">
              <span>
                #{last_order_id} {last_order_date}
              </span>
            </div>
            <div className="customer-div-8" data-label="Actions" onClick={() => handleRedirect("customer-detail", id)}>
            <span>
                <FontAwesomeIcon icon={faEye} />
            </span>

            </div>
        </div>
    );
}

export default CustomerList
