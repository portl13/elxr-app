import React from "react";
function RelOrder({ subscriberData }) {
  return (
    <>
      <div className="billing-wrapper">
        <div className="wcfm-datatable">
          <div className="row-head">
            <div className="sub-item-1">Order Number</div>
            <div className="sub-item-2">Relationship</div>
            <div className="sub-item-3">Date</div>
            <div className="sub-item-4">Status</div>
            <div className="sub-item-5">Total</div>
          </div>
          <div className="column-head">
            <div className="sub-item-1">
              <a>#{subscriberData.order_number}</a>
            </div>
            <div className="sub-item-2">
              {subscriberData.order_relationship}
            </div>
            <div className="sub-item-3">{subscriberData.order_date}</div>
            <div className="sub-item-4">
              <span>
                {subscriberData.order_status.charAt(0).toUpperCase() +
                  subscriberData.order_status.slice(1)}
              </span>
            </div>
            <div className="sub-item-5">${subscriberData.order_total}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default RelOrder;
