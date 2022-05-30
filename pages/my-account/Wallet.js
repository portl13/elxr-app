import React, { useState, useEffect } from "react";
import WalletList from "./WalletList";
import WalletTopup from "./WalletTopup";
import WalletTransfer from "./WalletTransfer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListAlt,
  faList,
  faPlusCircle,
  faRandom,
} from "@fortawesome/free-solid-svg-icons";
import {
  getBalance,
  getTransaction,
  transferAmount,
} from "../api/my-account/wallet.api";
import { Spinner } from "reactstrap";

function Wallet({ user, handleRedirect, innerNav }) {
  const [status, setStatus] = useState(innerNav);
  const [balance, setBalance] = useState();
  const [transactions, setTransactions] = useState();
  const [load, setLoad] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getWalletBalance();
    getTransactionList();
  }, []);

  function getWalletBalance() {
    getBalance(user).then((res) => setBalance(res.data.data));
  }

  function getTransactionList() {
    getTransaction(user).then((res) => setTransactions(res.data.data));
  }

  function submit(userId, amount, note) {
    setLoad(true);
    const formData = {
      transfer_user_id: parseInt(userId),
      transfer_amount: parseFloat(amount),
      transfer_note: note,
    };
    transferAmount(user, formData).then((res) => {
      setLoad(false);
      setBalance();
      getWalletBalance();
      getTransactionList();
      setUserId("")
      setAmount("")
      setNote("")
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), [1500]);
    });
  }
  return (
    <>
      <h3>My Wallet</h3>
      <div className="my-wallet-panel mt-4">
        <div className="woo-wallet-sidebar">
          <ul>
            <li
              className={status === "transactions" && "active"}
              onClick={() => {
                setStatus("transactions");
                handleRedirect("my-wallet", "transactions");
              }}
            >
              <a>My Wallet</a>
            </li>
            <li
              className={status === "topup" && "active"}
              onClick={() => {
                setStatus("topup");
                handleRedirect("my-wallet", "topup");
              }}
            >
              <a>
                <FontAwesomeIcon icon={faPlusCircle} />
                Wallet topup
              </a>
            </li>
            <li
              className={status === "transfer" && "active"}
              onClick={() => {
                setStatus("transfer");
                handleRedirect("my-wallet", "transfer");
              }}
            >
              <a>
                <FontAwesomeIcon icon={faRandom} />
                Wallet transfer
              </a>
            </li>
            <li
              className={status === "transact" && "active"}
              onClick={() => {
                setStatus("transact");
                handleRedirect("wallet-transaction");
              }}
            >
              <a>
                <FontAwesomeIcon icon={faList} />
                Transactions
              </a>
            </li>
            <li
              className={status === "withdrawal" && "active"}
              onClick={() => {
                setStatus("withdrawal");
                handleRedirect("wallet-withdrawl", "withdraw");
              }}
            >
              <a>
                <FontAwesomeIcon icon={faListAlt} />
                Withdrawal
              </a>
            </li>
          </ul>
        </div>
        <div className="woo-wallet-content">
          <div className="main-heading">
            <span>Balance</span>
            {!balance && (
              <Spinner
                style={{ width: "1.2rem", height: "1.2rem" }}
                color="primary"
              />
            )}
            {balance && <span>$ {balance}</span>}
          </div>
          {status === "transactions" && !transactions && (
            <Spinner
              style={{ width: "1.2rem", height: "1.2rem" }}
              color="primary"
            />
          )}
          {status === "transactions" && transactions && (
            <WalletList result={transactions} />
          )}
          {status === "topup" && <WalletTopup />}
          {status === "transfer" && (
            <WalletTransfer
              load={load}
              submit={submit}
              successMsg={successMsg}
              user={user}
              balance={balance}
              amount={amount}
              setAmount={setAmount}
              note={note}
              setNote={setNote}
              userId={userId}
              setUserId={setUserId}
            />
          )}
        </div>
      </div>
    </>
  );
}
export default Wallet;
