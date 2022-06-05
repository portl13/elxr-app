import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faEllipsisH,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { TIMEOUT } from "../../utils/constant";
import { Spinner } from "reactstrap";
import moment from "moment";
import { getMember } from "../../pages/api/channel.api";

function OrderList({ index, order, user, id, handleRedirect }) {
  const alert = useAlert();
  const [name, setName] = useState("");
  const member = async () => {
    try {      
      const { data }  = await getMember(user, id)
      setName(data.name);
    } catch (error) {
      setName("Not User")
    }
  };
  useEffect(() => {
    member();
  }, [id]);
  return (
    <>
      <div className="column-head">
        <div className="order-div-1" >
          {order.payment_method !== "" ? (
            <span className="status-pending-tag">
              <FontAwesomeIcon icon={faClock} />
              <span className="tooltip-panel">
                Pending Payment<em></em>
              </span>
            </span>
          ) : (
            <span className="status-processing-tag">
              <FontAwesomeIcon icon={faEllipsisH} />
              <span className="tooltip-panel">
                Processing<em></em>
              </span>
            </span>
          )}
        </div>
        <div className="order-div-2" data-label="Order">
          <div>
            #{order.id} by{" "}
            <span>
              {id &&
                (name === "" ? (
                  <Spinner
                    style={{ width: "1.2rem", height: "1.2rem" }}
                    color="primary"
                  />
                ) : (
                  name
                ))}
            </span> 
          </div>
         
        </div>
        <div className="order-div-3" data-label="Purchasedrder" >
          <div className="order-div-3-info">
            <span>{order.line_items.length} item</span> 1x{" "}
            {order.line_items.map((d) => d.name)[0]}
          </div>
        </div>
        <div className="order-div-4" data-label="Bgillin Address">
          <div className="order-div-4-info">
              <span>
              {order.billing.first_name} {order.billing.last_name}
              </span>{" "}
              <span>{order.billing.company}</span> {order.billing.address_1}{" "}
              {order.billing.city} {order.billing.state} {order.billing.postcode}
          </div>
        </div>
        <div className="order-div-5" data-label="Shipping Address">-</div>
        <div className="order-div-6" data-label="Gross Sales">
          <div>
          ${order.total}
          <span>
            {order.payment_method_title === ""
              ? null
              : `Via ${order.payment_method_title}`}
          </span>
          </div>
        </div>
        <div className="order-div-7" data-label="Earning">
          <div>
            ${order.total}
            <span
              className={order.payment_method !== "" ? "unpaid" : "requested"}
            >
              {order.payment_method !== "" ? "UNPAID" : "REQUESTED"}
            </span>
          </div>
          
        </div>
        <div className="order-div-8" data-label="Date">
          {moment(order.date_created).format("MMMM DD, YYYY h:mm a")}
        </div>
        <div className="order-div-9" data-label="Actions">
          <div className="order-div-9-icons" >
             <span onClick={() => alert.success("Coming Soon..", TIMEOUT)}>
            <FontAwesomeIcon icon={faCheckCircle} />
            <span className="tooltip-panel">
              Mark as Complete<em></em>
            </span>
          </span>
          <span onClick={() => handleRedirect("order-detail", id)}>
            <FontAwesomeIcon icon={faEye} />
            <span className="tooltip-panel">
              View Details<em></em>
            </span>
          </span>
          </div>
         
        </div>
      </div>
    </>
  );
}
export default OrderList;
