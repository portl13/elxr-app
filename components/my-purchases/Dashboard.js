import React, { useState, useEffect, useContext } from "react";
import RecentOrder from "@components/my-purchases/orders/RecentOrders";
import { getOrder } from "@api/my-account/Order.api";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const url = process.env.myAccount;

function Dashboard() {
  const { user, setUser } = useContext(UserContext);
  const token = user?.token;
  const router = useRouter();
  const signOut = async () => {
    setUser(null);
    await router.push("/");
  };

  const { data } = useSWR(
    token ? [`${url}/orders?page=${1}&per_page=${5}`, token] : null,
    genericFetch
  );

  return (
    <div>
      <h2>Hello {user?.displayName}</h2>
      <p>
        {user?.displayName} (not {user?.displayName}?
        <a
          className="text-primary d-inline-block ml-2"
          onClick={() => signOut()}
        >
          Log out
        </a>
        )
      </p>
      <p>
        From your account dashboard you can view your{" "}
        <Link href={"/purchases/orders"}>
          <a className="text-primary">recent orders</a>
        </Link>
        , manage your{" "}
        <Link href={"/settings/addresses"}>
          <a className="text-primary">shipping and billing addresses</a>
        </Link>
        , and{" "}
        <Link href={"/settings/login-information"}>
          <a className="text-primary">edit your password and account details</a>
        </Link>
        .
      </p>
      {!data && (
          <SpinnerLoader />
      )}
      {data && data.data && data.data.length > 0 && (
        <div className="inner-sub-heading">RECENT ORDERS</div>
      )}
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
            {data.data &&
              data.data.map((item) => {
                return (
                  <RecentOrder orderItem={item} id={item.id} key={item.id} />
                );
              })}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Dashboard;
