import Meta from "@components/layout/Meta";
import { faPlus, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function Wallet() {
  return (
    <div>
      <Meta />
      <Head>
        <title>MY WALLET</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            <div className=" border-white border-small ">
              <div className="row">
                <div className="col-12 col-md-6 ">
                  <div className=" ">
                    <div className="card-texto">
                      <h5>$1520.00</h5>
                      <span>Wallet Balance</span>
                      <p>
                        You want to withdraw from wallet and send to your
                        account? enter withdraw amount and send a request
                      </p>
                      <div>
                        <button className="btn btn-transparent border px-3 py-2">
                          Withdraw Money
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-3 d-flex justify-content-center align-items-center w-100">
                  <div className=" w-100">
                    <div className="card-texto d-flex flex-column">
                      <span>Recharge your wallet balance by adding money</span>
                      <div className="d-flex flex-column flex-md-row">
                        <div className="input-search pb-0 border-radius-35 w-100  mb-3">
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
                        <form className=" w-100">
                          <div className="contain-btn-icon">
                            <span className="contain-icon-plus">
                              {" "}
                              <FontAwesomeIcon
                                className="btn-create-icon"
                                icon={faPlus}
                              />{" "}
                            </span>
                            <button className="btn btn-create p">
                              Add Money
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <div>
              <h5>ALL TRANSACTIONS</h5>
            </div>
            <div className="d-none d-md-flex justify-content-around">
              <div>
                <span>Trasactions</span>
              </div>
              <div>
                <span>Date</span>
              </div>
              <div>
                <span>Amount</span>
              </div>
              <div>
                <span>Status</span>
              </div>
            </div>
            <div className=" border-white px-md-0 border-small mt-4 ">
            <div className="d-flex py-3 justify-content-around d-flex flex-column flex-md-row align-items-between align-items-md-center border-bottom table-responsive-row">
              <div className="transactions d-flex align-items-center py-1">
                <div className="transaction" data-label="Transactions">
                <span className="pr-2"> <FontAwesomeIcon className="icon-setting  text-primary" icon={faWallet} /> </span>
                <span>Money added to wallet</span>
                </div>
              </div>
              <div className="date d-flex justify-content-between py-1" data-label="Date">
                <span>06-16-2022</span>
              </div>
              <div className="amount d-flex justify-content-between py-1" data-label="Amount">
                <span>+$100.00</span>
              </div>
              <div className="success d-flex justify-content-between py-1" data-label="Success">
                <span className="text-success">Success</span>
              </div>
            </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
