import React from "react";
import moment from "moment";
import Link from "next/link";

function RecentOrder({ orderItem, id }) {
  return (
    <>
      <tr className={"custom-table-tr"}>
        <td data-label="Order" scope="row">#{orderItem?.id}</td>
        <td data-label="Date">{moment(orderItem?.date).format("MMMM DD, YYYY")}</td>
        <td data-label="Status">
          {orderItem?.status.charAt(0).toUpperCase() +
            orderItem?.status.slice(1)}
        </td>
        <td data-label="Total">${orderItem?.total} for 1 item</td>
        <td data-label="Actions" className={"custom-table-actions-buttons"}>
          <Link href={`/purchases/order/${id}`}>
            <a className="actions-buttons"> View</a>
          </Link>
        </td>
      </tr>
    </>
  );
}

export default RecentOrder;
