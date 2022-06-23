import Meta from '@components/layout/Meta';
import { faEllipsisH, faPlus, faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Head from 'next/head';
import React from 'react';

function OrdersNew() {
  return (
    <div>
      
      <div>
      <div className="container ">
        <div className="d-flex  justify-content-between pt-3 mb-5 mb-md-2">
          <div>
            <h2 className="title-dashboard">Products</h2>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <form action="">
              <div className="input-search-contain">
                <span className="input-search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  className="input-search"
                  type="search"
                  name=""
                  id=""
                  placeholder="Search"
                />
              </div>
            </form>
            <div className=" contain-icon-border">
              <span>
                <FontAwesomeIcon className="icon-setting " icon={faSlidersH} />
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-2">
          <div>
            <button className="btn btn-transparent">Digital Products</button>
          </div>
          <div>
            <button className="btn btn-transparent">Courses</button>
          </div>
          <div>
            <button className="btn btn-transparent">Subscription</button>
          </div>
        </div>
        <div className="d-none d-md-flex justify-content-around">
          <div>
            <p>Order ID</p>
          </div>
          <div>
            <p>Client Name</p>
          </div>
          <div>
            <p>Items</p>
          </div>
          <div>
            <p>Billing Address</p>
          </div>
          <div>
            <p>Purchased Date</p>
          </div>
          <div>
            <p>Payment Method</p>
          </div>
          <div>
            <p>Total Amount</p>
          </div>
          <div>
            <p>Action</p>
          </div>
        </div>
        <div className=" border-white px-0 ">
          <div className="table-responsive-row d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 px-3 px-md-0 border-bottom">
            <div className="pl-md-3 d-flex justify-content-between">
              <span className=" d-md-none">Order ID</span>
              <p className="text-success m-0">#4564220</p>
            </div>
            <div className="  d-flex justify-content-between align-items-center">
              <div className="img-circle mr-1">{/* <img src="" alt="" /> */}</div>
              <div>
                <p className="m-0">Keto Diet Video</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none"># Items</span>
              <p className="text-success m-0">5</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Billing Address</span>
              <p className="m-0">1971 Neha Avenue</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Purchased Date</span>
              <p className="m-0">08-07-2022</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Payment Method</span>
              <p className="m-0">Credit Card</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Total Amount</span>
              <p className="m-0">$20.99</p>
            </div>
            <div className=" pr-md-4 d-flex justify-content-between">
                <span className='d-flex d-md-none'>Action</span>
              <span>
                <a href="#">View</a>
              </span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default OrdersNew;
