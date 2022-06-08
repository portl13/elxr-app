import React from "react";
function SubItemHeadCard({ subData }) {
  return (
    <>
      <div className="column-head">
        <div className="item-1">
          <img src={subData.thumbnail} alt="image" />
        </div>
        <div className="item-2">
          <a>{subData.name}</a>
        </div>
        <div className="item-3">${subData.total}.00</div>
        <div className="item-4">× {subData.quantity}</div>
        <div className="item-5">${subData.total}.00</div>
        <div className="item-6">${subData.discount}.00</div>
      </div>
    </>
  );
}
export default SubItemHeadCard;
