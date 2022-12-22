import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import SubscriptionCard from "@components/my-purchases/subscriptions/SubscriptionCard";
import { UserContext } from "@context/UserContext";
import { subscriptionsStyle } from "../Subcriptions";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import { format } from "date-fns";
import Link from "next/link";

const myAccountApi = process.env.myAccount + "/subscriptions";

/**
 * TODO: Add Pagination
 */
function MySubscriptions() {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data, error } = useSWR(token ? [myAccountApi, token] : null, genericFetch);
  const isLoading = !data && !error;
  return (
    <section css={subscriptionsStyle}>
      <h3>Subscriptions</h3>
      <div className="container container-80">
        <table className="table table-custom">
          <thead>
            <tr>
              <th scope="col">Subscription</th>
              <th scope="col">Status</th>
              <th scope="col">Next Payment</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className={"table-body"}>
            {data &&
              data.data &&
              data.data.length > 0 &&
              data.data.map((subscription) => (
                <tr>
                  <th>#{subscription?.id}</th>
                  <td className={"text-capitalize"}>{subscription?.status}</td>
                  <td>
                    {format(
                      new Date(subscription?.next_payment),
                      "MMMM dd, yyyy"
                    )}
                  </td>
                  <td>${subscription?.total}</td>
                  <td>
                    <Link href={`/purchases/subscription/${subscription?.id}`}>
                      <a className={"btn btn-primary border-radius-35"}>view</a>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && <SpinnerLoader />}
        {data && data.data && data.data.length === 0 && (
          <>
            <FontAwesomeIcon icon={faClock} />
            You have no active subscriptions.
          </>
        )}
      </div>
    </section>
  );
}

export default MySubscriptions;
