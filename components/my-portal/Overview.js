import React, { useState, useEffect } from "react";
import BillingDetail from "./BillingDetail";
import { Input, Alert, Button } from "reactstrap";
import Loader from "../loader";
import moment from "moment";
function Overview({ subscriberData, updateStatus, show, showLoader }) {
  const [status, setStatus] = useState();
  useEffect(() => {
    if (subscriberData.subscription_status !== "cancelled") {
      setStatus(subscriberData.subscription_status);
    }
  }, []);
  return (
    <>
      <div className="billing-wrapper">
        <div className="overview-section">
          <div className="overview-panel">
            <div className="left-panel">Subscription Created:</div>
            <div className="right-panel">
              {subscriberData.subscription_created}
            </div>
          </div>
          <div className="overview-panel">
            <div className="left-panel">Order Number:</div>
            <div className="right-panel">
              <span className="active-state">
                #{subscriberData.order_number}
              </span>
              – {subscriberData.order_status} (
              {moment(subscriberData.order_date).format("MMMM DD,YYYY")})
            </div>
          </div>
          <div className="overview-panel">
            <div className="left-panel">Subscription Status:</div>
            <div className="right-panel">
              {subscriberData.subscription_status === "cancelled" ||
              subscriberData.subscription_status === "expired" ? (
                <input
                  type="text"
                  value={
                    subscriberData.subscription_status.charAt(0).toUpperCase() +
                    subscriberData.subscription_status.slice(1)
                  }
                  disabled
                />
              ) : (
                <Input
                  type="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="expired">Expired</option>
                </Input>
              )}
              {show && (
                <Alert color="success">
                  Subscriber Status update successfully.
                </Alert>
              )}
              {(subscriberData.subscription_status === "active" ||
                subscriberData.subscription_status === "on-hold") && (
                <Button
                  onClick={() =>
                    updateStatus(subscriberData.subscription_id, status)
                  }
                >
                  {showLoader && <Loader />}Update
                </Button>
              )}
            </div>
          </div>
        </div>
        <BillingDetail subscriberData={subscriberData} />
      </div>
    </>
  );
}
export default Overview;
