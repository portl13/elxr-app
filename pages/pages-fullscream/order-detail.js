import Meta from "@components/layout/Meta";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import React from "react";

function OrderDetail() {
  return (
    <div>
      <Meta />
      <Head>
        <title>GO LIVE</title>
      </Head>
      <div className="container">
        <div className="d-flex align-items-center">
          <span className="contain-icon">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </span>
          <span className="back">Back</span>
        </div>
        <div>
          <h3 className="mb-0 mt-3">
            Order ID <span className="text-primary">#4564220</span>
          </h3>
          <span>Order Date - 08-06-2022</span>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <div className="d-flex justify-content-around mb-1 mt-4">
              <div>
                <span>Product Name</span>
              </div>
              <div>
                <span>Qty</span>
              </div>
              <div>
                <span>Price</span>
              </div>
              <div>
                <span>Total Amount</span>
              </div>
            </div>
            <div className="border-white px-md-0">
              <div className="table-responsive-row px-3 py-2 border-bottom d-flex justify-content-between">
                <div className="d-flex  align-items-center">
                  <div className="imag mr-2">{/* <img src="" alt="" /> */}</div>
                  <span>Balanced Diet Audio</span>
                </div>
                <div>
                  <span>2</span>
                </div>
                <div>
                  <span>$10.50</span>
                </div>
                <div>
                  <span>$21.00</span>
                </div>
              </div>
            </div>
            <div className="border-white mt-2 px-md-0">
              <div className="table-responsive-row px-3 py-2 border-botto ">
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>$52.50</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Admin Fee:</span>
                  <span>$5.00</span>
                </div>
                <div className="d-flex justify-content-between">
                  <h5>Gross Total:</h5>
                  <h5>$57.50</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div>
              <h3>Client Details</h3>
            </div>
            <div className="border-white d-flex  mt-2">
              <div className="imag-circular mr-2 rounded-circle">
                <img src="" alt="" />
              </div>
              <div className="d-flex flex-column">
                <div>
                  <h5 className="m-0">Ernest Fletcher</h5>
                </div>
                <div className="d-flex flex-column">
                  <p className="m-0 font-size-12">ernestfletcher@gmail.com</p>
                  <span className="m-0 font-size-12">+1(373)511-5329</span>
                </div>
              </div>
            </div>
            <div>
              <h3>Billing Details</h3>
            </div>
            <div className="border-white d-flex  mt-2">
            <div className="table-responsive-row px-3 py-2 border-botto ">
                <div className="d-flex justify-content-start">
                  <span className="font-size-12 pr-2">Stret:</span>
                  <span className="font-size-12 ">2118 Reeves Street</span>
                </div>
                <div className="d-flex justify-content-start">
                  <span className="font-size-12 pr-2">City:</span>
                  <span className="font-size-12 ">Milwaukee</span>
                </div>
                <div className="d-flex justify-content-start">
                  <span className="font-size-12 pr-2">Province:</span>
                  <span className="font-size-12 ">Wisconsin</span>
                </div>
                <div className="d-flex justify-content-start">
                  <span className="font-size-12 pr-2">Zip code:</span>
                  <span className="font-size-12 ">53226</span>
                </div>
                <div className="d-flex justify-content-start">
                  <span className="font-size-12 pr-2">Country:</span>
                  <span className="font-size-12 ">United States</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
