import React from "react";
import SubItemHeadCard from "./SubItemHeadCard";
import SubItemCard from "./SubItemCard";
function SubItem({ subscriberData }) {
  return (
    <>
      <div className="billing-wrapper">
        <div className="wcfm-datatable">
          <div className="row-head">
            <div className="item-1"></div>
            <div className="item-2">Item</div>
            <div className="item-3">Cost</div>
            <div className="item-4">Qty</div>
            <div className="item-5">Total</div>
            <div className="item-6">Earning</div>
          </div>
          {subscriberData.items.map((subData) => (
            <SubItemHeadCard subData={subData} />
          ))}
        </div>
        {subscriberData.items.map((subData) => (
          <SubItemCard subData={subData} />
        ))}
      </div>
    </>
  );
}
export default SubItem;
