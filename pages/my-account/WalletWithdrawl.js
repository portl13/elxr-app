import React, { useState } from "react";
import WithDraw from "./WithDraw";
import ApproveRequest from "./ApproveRequest";
import CancelRequest from "./CancelRequest";
import PaymentSetting from "./PaymentSetting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

function WalletWithdrawl({ handleRedirect, innerNav }) {
  const [status, setStatus] = useState(innerNav);
  return (
    <>
      <div className="wallet-data-wrapper">
        <div className="wc-subscription-info">
          <FontAwesomeIcon icon={faClipboard} />
          Current wallet balance: $30.39
          <button className="browser-tag">Add payment method</button>
        </div>
        <div className="withdraw-wrapper-div">
          <ul>
            <li
              onClick={() => {
                setStatus("withdraw");
                handleRedirect("wallet-withdrawl", "withdraw");
              }}
              className="active"
            >
              Withdraw Request
            </li>
            <li
              onClick={() => {
                setStatus("approve");
                handleRedirect("wallet-withdrawl", "approve");
              }}
            >
              Approved Requests
            </li>
            <li
              onClick={() => {
                setStatus("cancel");
                handleRedirect("wallet-withdrawl", "cancel");
              }}
            >
              Cancelled Requests
            </li>
            <li
              onClick={() => {
                setStatus("payment");
                handleRedirect("wallet-withdrawl", "payment");
              }}
            >
              Payment Settings
            </li>
          </ul>
          <div className="view-wrapper-panel">
            {status === "withdraw" && <WithDraw />}
            {status === "approve" && <ApproveRequest />}
            {status === "cancel" && <CancelRequest />}
            {status === "payment" && <PaymentSetting />}
          </div>
        </div>
      </div>
    </>
  );
}
export default WalletWithdrawl;
