import React, { useState, useContext, useEffect } from "react";
import { Spinner } from "reactstrap";
import OrderCard from "@components/my-purchases/OrderCard";
import useSWR from "swr";
import { genericFetch, genericFetchWithHeader } from "@request/dashboard";
import RecentOrder from "@components/my-purchases/orders/RecentOrders";
import { UserContext } from "@context/UserContext";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import Pagination from "@components/shared/pagination/Pagination";

const url = process.env.myAccount;
const wooUrl = process.env.woocomApi;

function Orders() {
  const { user } = useContext(UserContext);
  const limit = 20;
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const token = user?.token;
  const { data } = useSWR(
    token
      ? [
          `${wooUrl}/orders?page=${page}&per_page=${limit}&customer=${user.id}`,
          token,
        ]
      : null,
    genericFetchWithHeader
  );

  useEffect(() => {
    if (data && data.headers && data.headers["x-wp-total"]) {
      setTotal(data.headers["x-wp-total"]);
    }
  }, [data]);
  return (
    <>
      <h3>Orders</h3>
      <div className="wc-MyAccount-inner-content">
        {!data && <SpinnerLoader />}
        {data && data.data && data.data.length > 0 && (

          <table className="table custom-table">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Total</th>
                <th scope="col" className={"text-center"}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item) => {
                return (
                  <RecentOrder orderItem={item} id={item.id} key={item.id} />
                );
              })}
            </tbody>
          </table>

        )}
        {data && data.data && data.data.length === 0 && (
          <div className="wc-MyAccount-fix-center text-center my-5">
            <div className="icon-tag">
              <OrderCard />
            </div>
            <div className="wc-tagline mt-3">No order has been made yet.</div>
          </div>
        )}
      </div>
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
    </>
  );
}
export default Orders;
