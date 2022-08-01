import React, { useState, useEffect } from "react";
import { getSubscription } from "@api/my-account/Subscription.api";
import { Spinner } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import SubscriptionCard from "@components/my-purchases/subscriptions/SubscriptionCard";

import { subscriptionsStyle } from '@components/my-purchases/Subcriptions'
function Subscriptions({ user, handleRedirect }) {
  const [result, setResult] = useState();
  const [load, setLoad] = useState(false);
  useEffect(() => getSubscriptionDetail(), []);
  function getSubscriptionDetail() {
    getSubscription(user)
      .then((res) => {
        setResult(res.data.data);
        setLoad(true);
      })
      .catch((error) => console.log(error));
  }
  return (
    <section css={subscriptionsStyle}>
      <h3>Subscriptions</h3>
      <div className="account-subscription-wrapper mt-4">
        <span className="account-subscription-panel fx-d">
          {!load && (
            <Spinner
              style={{ width: "1.2rem", height: "1.2rem" }}
              color="primary"
            />
          )}
          {load && result.length === 0 && (
            <>
              <FontAwesomeIcon icon={faClock} />
              You have no active subscriptions.
            </>
          )}
          {load &&
            result.map((d) => (
              <SubscriptionCard key={d.id} result={d} handleRedirect={handleRedirect} />
            ))}
        </span>
        {/* {load && result.length === 0 && (
          <button className="button-tag" onClick={() => Router.push("/shop")}>
            Browse products
          </button>
        )} */}
      </div>
    </section>
  );
}
export default Subscriptions;
