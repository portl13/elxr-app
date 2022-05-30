import React from "react";
import moment from "moment";

function TransactionCard({ transactions }) {
    return (
        <>
            <div className="wcfm-datatable">
                <div className="d-flex flex-column flex-fill w-100">
                    <div className="column-head">
                        <div className="credit-col-1">{transactions?.transaction_id}</div>
                        <div className="credit-col-2">{transactions?.type === "credit" ? <span>${parseFloat(transactions?.amount)}</span> : "-"}</div>
                        <div className="credit-col-3">{transactions?.type === "debit" ? <span>${parseFloat(transactions?.amount)}</span> : "-"} </div>
                        <div className="credit-col-4">{transactions?.details} </div>
                        <div className="credit-col-5">{moment(transactions?.date).format("MMMM DD, YYYY")}</div>
                    </div>


                </div>

            </div>
        </>
    )
}
export default TransactionCard;