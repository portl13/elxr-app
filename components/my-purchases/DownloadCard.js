import React from "react";
import DownloadCardDetail from "@components/my-purchases/DownloadCardDetail";
import { v4 as uuidv5 } from "uuid";
import RecentOrder from "@components/my-purchases/orders/RecentOrders";

function DownloadCard({ result }) {
  return (
      <table className="table custom-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Downloads remaining</th>
            <th scope="col">Expires</th>
            <th scope="col" className={"text-center"}>Download</th>
          </tr>
        </thead>
        <tbody>
          {result?.map((d) => (
            <DownloadCardDetail key={`${d.order_id}-${uuidv5()}`} result={d} />
          ))}
        </tbody>
      </table>
  );
}
export default DownloadCard;
