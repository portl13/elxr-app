import React from "react";
import Link from "next/link";
import DashboardCartIcon from "@icons/DashboardCart";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const url = `${process.env.apiV2}/dashboard/notifications/`;

function StoreNotificationsCard({ token }) {
  const { data, isLoading } = useSWR(token ? [url, token] : null, genericFetch);

  return (
    <div className="w-100 dashboard-card p-0">
      <div className="row m-0">
        <div className="col-12 p-4">
          <h5 className="font-quicksand m-0">STORE NOTIFICATIONS</h5>
        </div>
      </div>

      {isLoading ? <SpinnerLoader /> : null}

      {!isLoading ? (
        <div className="row mx-0 store-list mr-3">
          {data &&
            data?.length &&
            data.map((item) => (
              <div key={item.ID} className="row mx-0 mb-3">
                <div className="col-2">
                  <DashboardCartIcon className="store-item-icon" />
                </div>
                <div className="col-10">
                  <span className="store-item-text color-font">{item?.message}</span>
                </div>
              </div>
            ))}
        </div>
      ) : null}

      <div className="row mx-0 p-4">
        <Link href="/manage/orders">
          <button className="store-button color-font">See all</button>
        </Link>
      </div>
    </div>
  );
}

export default StoreNotificationsCard;
