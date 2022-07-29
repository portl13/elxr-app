import React from "react";
import moment from "moment";
import Link from "next/link";

function RecentOrder({ orderItem, id, handleRedirect }) {
  return (
    <div className="column-head">
      <div className="recent-col" data-label="ORDER">
        <span>#{orderItem?.id}</span>
      </div>
      <div className="recent-col" data-label="DATE">
        <span>{moment(orderItem?.date).format("MMMM DD, YYYY")}</span>
      </div>
      <div className="recent-col" data-label="STATUS">
        <span>
          {orderItem?.status.charAt(0).toUpperCase() +
            orderItem?.status.slice(1)}
        </span>
      </div>
      <div className="recent-col" data-label="TOTAL">
        <span>${orderItem?.total} for 1 item</span>
      </div>
      <div className="recent-col actions" data-label="ACTIONS">
        <Link href={''}>
          <a className="actions-buttons"> View</a>
        </Link>
      </div>
    </div>
  );
}

export default RecentOrder;
