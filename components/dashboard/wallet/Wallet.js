import React from "react";
import { useState } from "react";
import { faPlus, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WalletAddModal from "./WalletAddModal";

function Wallet() {
  const [open, setOpen] = useState(false);
  return (
    <div className="row">
      <div className="col-12 mt-3">
        <div className=" border-white border-small ">
          <div className="row">
            <div className="col-12 col-md-6 ">
              <div className=" ">
                <div className="card-texto">
                  <h5 className="wallet-amount">$1520.00</h5>
                  <span className="my-3 d-block font-weight-bold wallet-amount-subtitle">
                    Wallet Balance
                  </span>
                  <p className="font-size-14">
                    You want to withdraw from wallet and send to your account?
                    enter withdraw amount and send a request
                  </p>
                  <div>
                    <button
                      onClick={() => setOpen(!open)}
                      className="btn btn-transparent border px-3 py-2"
                    >
                      Withdraw Money
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 mt-3 mt-md-0 w-100">
              <div className=" w-100">
                <div className="card-texto d-flex flex-column">
                  <span className="d-block mb-3 font-size-14">
                    Recharge your wallet balance by adding money
                  </span>
                    <form className=" w-100">
                  <div className="d-flex flex-column flex-md-row">
                      <div className="input-search py-0 border-radius-35 w-100  mb-3">
                        <label
                          className="w-100 upload-info mb-0"
                          htmlFor="name"
                        >
                          <input
                            className="bg-transparent py-2 text-white border-0 w-100"
                            type="name"
                          />
                        </label>
                      </div>
                      <div>
                        <button className="btn btn-create pl-2 d-flex nowrap">
                          <i className="">
                            <FontAwesomeIcon
                              className="btn-create-icon"
                              icon={faPlus}
                            />
                          </i>
                          <span>Add Money</span>
                        </button>
                      </div>
                      
                  </div>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 mt-5">
        <div>
          <h5 className="font-weight-bold font-size-22">ALL TRANSACTIONS</h5>
        </div>
        <div className="d-none d-md-flex justify-content-around mt-3 table-responsive-row px-3">
          <div className="d-flex wallet-transaction">
            <span>Trasactions</span>
          </div>
          <div className="d-flex wallet-date">
            <span>Date</span>
          </div>
          <div className="d-flex wallet-amount-row">
            <span>Amount</span>
          </div>
          <div className="d-flex wallet-status">
            <span>Status</span>
          </div>
        </div>
        <div className=" border-white px-md-0 border-small mt-3">
          <div className="d-flex py-3 justify-content-around d-flex flex-column flex-md-row align-items-between align-items-md-center border-bottom table-responsive-row px-md-3">
            <div className="transactions d-flex align-items-center py-1 wallet-transaction">
              <div className="transaction" data-label="Transactions">
                <span className="pr-2">
                  {" "}
                  <FontAwesomeIcon
                    className="icon-setting  text-primary"
                    icon={faWallet}
                  />{" "}
                </span>
                <span>Money added to wallet</span>
              </div>
            </div>
            <div
              className="date d-flex justify-content-between py-1 wallet-date"
              data-label="Date"
            >
              <span>06-16-2022</span>
            </div>
            <div
              className="amount d-flex justify-content-between py-1 wallet-amount-row"
              data-label="Amount"
            >
              <span>+$100.00</span>
            </div>
            <div
              className="success d-flex justify-content-between py-1 wallet-status"
              data-label="Status"
            >
              <span className="text-success">Success</span>
            </div>
          </div>
        </div>
      </div>
      <WalletAddModal open={open} setOpen={setOpen} />
    </div>
  );
}

export default Wallet;
