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
            className="d-flex justify-content-between"
          >
            <div className="mb-3">
              {d.details}
              <span>{moment(d.date).format("MMMM DD, YYYY")}</span>
            </div>
            <div className={d.type === "debit" ? "text-red" : "text-green"}>
              {d.type === "debit" ? "-" : "+"}${parseFloat(d.amount)}
            </div>
          </div>
        ))}
    </>
  );
}
export default WalletList;
