import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import SubscriptionCard from "@components/my-purchases/subscriptions/SubscriptionCard";
import { UserContext } from "@context/UserContext";
import { subscriptionsStyle } from "../Subcriptions";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { genericFetchWithHeader } from "@request/dashboard";
import { format } from "date-fns";
import Link from "next/link";
import Pagination from "@components/shared/pagination/Pagination";

const subscriptionsUrl =
  process.env.baseUrl + "/wp-json/wc/v1/subscriptions?customer=";


function MySubscriptions() {
  const { user } = useContext(UserContext);
  const limit = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const token = user?.token;

  const { data, error } = useSWR(
    token
      ? [`${subscriptionsUrl}${user.id}&page=${page}&per_page=${limit}`, token]
      : null,
    genericFetchWithHeader
  );

  const isLoading = !data && !error;

  useEffect(() => {
    if (data && data.headers && data.headers["x-wp-total"]) {
      setTotal(data.headers["x-wp-total"]);
    }
  }, [data]);

  return (
    <section css={subscriptionsStyle}>
      <div className="container container-80">
        <h3>Subscriptions</h3>
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
          {!isLoading ? (
            <tbody className={"table-body"}>
              {data &&
                data.data &&
                data.data.length > 0 &&
                data.data.map((subscription) => (
                  <tr key={subscription?.id}>
                    <th>#{subscription?.id}</th>
                    <td className={"text-capitalize"}>
                      {subscription?.status}
                    </td>
                    <td>
                      {subscription?.status !== "pending-cancel" ? format(
                        new Date(subscription?.next_payment_date),
                        "MMMM dd, yyyy"
                      ) : "Not Applicable"}
                    </td>
                    <td>${subscription?.total}</td>
                    <td>
                      <Link
                        href={`/purchases/subscription/${subscription?.id}`}
                      >
                        <a className={"btn btn-primary border-radius-35"}>
                          view
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          ) : null}
        </table>
        {isLoading && <SpinnerLoader />}
        {data && data.data && data.data.length === 0 && (
          <>
            <FontAwesomeIcon icon={faClock} />
            You have no active subscriptions.
          </>
        )}
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default MySubscriptions;
