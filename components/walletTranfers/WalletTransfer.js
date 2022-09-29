import React, { useState, useEffect } from "react";
import { Alert, Spinner, Input } from "reactstrap";
import { getUser } from "@api/my-account/wallet.api";

function WalletTransfer({
  submit,
  load,
  successMsg,
  user,
  balance,
  amount,
  setAmount,
  userId,
  setUserId,
  note,
  setNote,
  members,
}) {
  const [amountAlert, setAmountAlert] = useState(false);
  const [noteAlert, setNoteAlert] = useState(false);
  const [userAlert, setUserAlert] = useState(false);
  const [balanceAlert, setBalanceAlert] = useState(false);


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
      <div className="row">
        <div className="col-12 mb-4">
          <label>Select Recipient</label>
          <Input
            className="input-default-43"
            type="select"
            onChange={(e) => {
              setUserId(e.target.value);
              setUserAlert(false);
            }}
          >
            <option value="">Select user</option>
            {members &&
              members.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.mention_name}
                </option>
              ))}
          </Input>
          {userAlert && <Alert color="warning">Please select a user</Alert>}
        </div>
        <div className="col-12 mb-4">
          <label>Amount</label>
          <input
            className="input-default-43"
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
        <div className="col-12 mb-4">
          <label>What's this for?</label>
          <textarea
            className="input-default"
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
      </div>
      <div className="d-flex justify-content-end">
        <div>
          <button
            className="btn-create px-3 py-2"
            onClick={(e) => submitValue(e)}
          >
            {load && <Spinner style={{ width: "1.2rem", height: "1.2rem" }} />}{" "}
            Proceed to transfer
          </button>
        </div>
      </div>
      {successMsg && (
        <Alert color="success">Amount successfully transfer.</Alert>
      )}
    </>
  );
}
export default WalletTransfer;
