import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTimesCircle,
  faCheck,
  faExclamationCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
function SubscriberList({ index, user, subscriber, id, handleRedirect }) {
  return (
    <>
      <div className="column-head">
        <div className="subscription-col-1">
          {subscriber.status === "expired" && (
            <span className="expired-tag">
              <FontAwesomeIcon icon={faExclamationCircle} />
              <span className="tooltip-panel">
                Expired
                <em></em>
              </span>
            </span>
          )}
          {subscriber.status === "on-hold" && (
            <span className="onhold-tag">
              <FontAwesomeIcon icon={faMinusCircle} />
              <span className="tooltip-panel">
                On hold
                <em></em>
              </span>
            </span>
          )}
          {subscriber.status === "cancelled" && (
            <span className="cancel-tag">
              <FontAwesomeIcon icon={faTimesCircle} />
              <span className="tooltip-panel">
                {subscriber.status.charAt(0).toUpperCase() +
                  subscriber.status.slice(1)}
                <em></em>
              </span>
            </span>
          )}
          {subscriber.status === "active" && (
            <span className="tick-tag">
              <FontAwesomeIcon icon={faCheck} />
              <span className="tooltip-panel">
                {subscriber.status.charAt(0).toUpperCase() +
                  subscriber.status.slice(1)}
                <em></em>
              </span>
            </span>
          )}
        </div>
        <div className="subscription-col-2" data-label="Subscription">
          <div className="subscription-col-2-container">
          <a href="">#{subscriber.subscription_id}</a> by{" "}
          <a href="">
            {subscriber.customer_first_name} {subscriber.customer_last_name}
          </a>
          </div>
        </div>
        <div className="subscription-col-3"  data-label="Order">
          <div>
            <span>#{subscriber.order_id}</span>
            {subscriber.order_status}
          </div>
        </div>
        <div className="subscription-col-4"  data-label="Items">{subscriber.items}</div>
        <div className="subscription-col-5"  data-label="Total">
          <div>
          ${subscriber.total}
          {/* / month */}
          <span>{subscriber.payment_method}</span>
          </div>
        </div>
        <div className="subscription-col-6"  data-label="Start Date">{subscriber.start_date}</div>
        <div className="subscription-col-7"  data-label="Trial End">{subscriber.trial_end}</div>
        <div className="subscription-col-8"  data-label="Next Payment">{subscriber.next_payment}</div>
        <div className="subscription-col-9"  data-label="Last Order">{subscriber.start_date}</div>
        <div className="subscription-col-10"  data-label="End Date">{subscriber.end_date}</div>
        <div className="subscription-col-11"  data-label="Actions">
          <span onClick={() => handleRedirect("subscriber-detail", id)}>
            <FontAwesomeIcon icon={faEye} />
            <span className="tooltip-panel">
              View Details<em></em>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
export default SubscriberList;
