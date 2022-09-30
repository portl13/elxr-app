import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import SubscriptionCard from "@components/my-purchases/subscriptions/SubscriptionCard";
import { UserContext } from "@context/UserContext";
import { subscriptionsStyle } from "../Subcriptions";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";

const myAccountApi = process.env.myAccount + "/subscriptions";

function MySubscriptions() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data } = useSWR(token ? [myAccountApi, token] : null, genericFetch);
  const isLoading = !data
  return (
    <section css={subscriptionsStyle}>
      <h3>Subscriptions</h3>
      <div className="account-subscription-wrapper mt-4">
        <span className="account-subscription-panel fx-d flex-column">
          {isLoading && <SpinnerLoader />}
          {data && data.data && data.data.length === 0 && (
            <>
              <FontAwesomeIcon icon={faClock} />
              You have no active subscriptions.
            </>
          )}
          {data && data.data && data.data.length > 0 && data.data.map((d) => (
              <SubscriptionCard
                key={d.id}
                result={d}
                handleRedirect={() => {}}
              />
            ))}
        </span>
      </div>
    </section>
  );
}

export default MySubscriptions;
