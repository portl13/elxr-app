import React from "react";
function DashBoardCard({ result }) {
  return (
    <>
      <div className="wc-address-details">
        <span>{result?.first_name} {result?.last_name}</span>
        <span>{result?.company}</span>
        <span>{result?.address_1}</span>
        <span>{`${result?.city}, ${result?.state} ${result?.postcode}`}</span>
        <span>{result?.state}</span>
        <span>{result?.postcode}</span>
        <span>{result?.phone}</span>
        <span>{result?.email}</span>
      </div>
    </>
  );
}
export default DashBoardCard;
