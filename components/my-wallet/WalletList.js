import React from "react";
import moment from "moment";

function WalletList({ result }) {
  return (
    <>
      {result?.length === 0 && (
        <div className="main-content">
          <div className="no-transaction">No transactions found</div>
        </div>
      )}
      {result &&
        result.map((d) => (
          <div
            key={d.transaction_id}
            className="item-wallet bg-new"
          >
            <div >
              {d.details}
              <span className={"d-inline-block ml-2"}>{moment(d.date).format("MMMM DD, YYYY")}</span>
            </div>
            <div className={`item-wallet-debit ${d.type === "debit" ? "text-red" : "text-green"}`}>
              {d.type === "debit" ? "-" : "+"}${parseFloat(d.amount)}
            </div>
          </div>
        ))}
    </>
  );
}
export default WalletList;
