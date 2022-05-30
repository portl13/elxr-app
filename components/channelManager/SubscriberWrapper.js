import React from "react";
import Overview from "./Overview";
import Billing from "./Billing";
import SubItem from "./SubItem";
import RelOrder from "./RelOrder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
function SubscriberWrapper({
  subscriberData,
  handleRedirect,
  updateStatus,
  show,
  showLoader,
}) {
  return (
    <>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container">
          <h3>
            Subscription #{subscriberData.subscription_id}
            <span
              className={
                subscriberData.subscription_status === "active"
                  ? "state-tag active-state"
                  : subscriberData.subscription_status === "on-hold"
                  ? "state-tag onhold-state"
                  : subscriberData.subscription_status === "expired"
                  ? "state-tag expired-state"
                  : "state-tag cancelled-state"
              }
            >
              {subscriberData.subscription_status.charAt(0).toUpperCase() +
                subscriberData.subscription_status.slice(1)}
            </span>
          </h3>
          <div className="money-bill">
            <FontAwesomeIcon
              icon={faMoneyBill}
              onClick={() => handleRedirect("subscriber", "all")}
            />
            <div className="tooltip-panel">
              <em></em>
              Subscriptions List
            </div>
          </div>
        </div>
        <h4>Overview</h4>
        <Overview
          subscriberData={subscriberData}
          updateStatus={updateStatus}
          show={show}
          showLoader={showLoader}
        />
        {/* <h4>Billing Schedule</h4>
        <Billing subscriberData={subscriberData} /> */}
        <h4>Subscription Item</h4>
        <SubItem subscriberData={subscriberData} />
        <h4>Related Orders</h4>
        <RelOrder subscriberData={subscriberData} />
      </div>
    </>
  );
}
export default SubscriberWrapper;
