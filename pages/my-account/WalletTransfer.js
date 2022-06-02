import React, { useState, useEffect } from "react";
import { Alert, Spinner, Input } from "reactstrap";
import { getUser } from "@api/my-account/wallet.api";

function WalletTransfer({ submit, load, successMsg, user, balance, amount, setAmount, userId,setUserId, note, setNote }) {
  //const [amount, setAmount] = useState("");
 // const [note, setNote] = useState("");
  const [amountAlert, setAmountAlert] = useState(false);
  const [noteAlert, setNoteAlert] = useState(false);
  const [userAlert, setUserAlert] = useState(false);
  const [balanceAlert, setBalanceAlert] = useState(false);
  const [userData, setUserData] = useState();
  // const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  function getUserData() {
    getUser(user, user.displayName).then((res) => {
      setUserData(res.data.data);
    });
  }

  function getAmount(e) {
    const exp = /^\d*\.?\d*$/;
    if (e.target.value === "" || exp.test(e.target.value)) {
      setAmount(e.target.value);
    }
  }

  function submitValue(e) {
    if (userId === "") {
      setUserAlert(true);
    } else if (amount === "") {
      setAmountAlert(true);
    } else if (amount > parseFloat(balance)) {
      setBalanceAlert(true);
    } else if (note === "") {
      setNoteAlert(true);
    } else {
      
      submit(userId, amount, note);
      
    }
  }

  return (
    <>
      <div className="woo-wallet-add-amount">
        <div className="col-tag">
          <label>Select Recipient</label>
          <Input
            type="select"
            onChange={(e) => {
              setUserId(e.target.value);
              setUserAlert(false);
            }}
          >
            <option value="">Select user</option>
            {userData &&
              userData.map((d) => <option key={d.value} value={d.value}>{d.label.split('(')[0]}</option>)}
          </Input>
          {userAlert && <Alert color="warning">Please select a user</Alert>}
        </div>
        <div className="col-tag">
          <label>Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              getAmount(e);
              setAmountAlert(false);
              setBalanceAlert(false);
            }}
          />
          {amountAlert && (
            <Alert color="warning">Please fill the Amount.</Alert>
          )}
          {balanceAlert && (
            <Alert color="warning">Enter amount is greater than balance.</Alert>
          )}
        </div>
        <div className="col-tag">
          <label>What's this for?</label>
          <textarea
            rows="4"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
              setNoteAlert(false);
            }}
          ></textarea>
          {noteAlert && (
            <Alert color="warning">
              Please fill the purpose of amount transfer.
            </Alert>
          )}
        </div>
        <div className="btn-tag">
          <button onClick={(e) => submitValue(e)}>
            {load && <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />}{" "}
            Proceed to transfer
          </button>
        </div>
        {successMsg && (
          <Alert color="success">Amount successfully transfer.</Alert>
        )}
      </div>
    </>
  );
}
export default WalletTransfer;
