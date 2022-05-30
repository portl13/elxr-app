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
        <div className="subscription-col-2">
          <a href="">#{subscriber.subscription_id}</a> by{" "}
          <a href="">
            {subscriber.customer_first_name} {subscriber.customer_last_name}
          </a>
        </div>
        <div className="subscription-col-3">
          <span>#{subscriber.order_id}</span>
          {subscriber.order_status}
        </div>
        <div className="subscription-col-4">{subscriber.items}</div>
        <div className="subscription-col-5">
          ${subscriber.total}
          {/* / month */}
          <span>{subscriber.payment_method}</span>
        </div>
        <div className="subscription-col-6">{subscriber.start_date}</div>
        <div className="subscription-col-7">{subscriber.trial_end}</div>
        <div className="subscription-col-8">{subscriber.next_payment}</div>
        <div className="subscription-col-9">{subscriber.start_date}</div>
        <div className="subscription-col-10">{subscriber.end_date}</div>
        <div className="subscription-col-11">
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
