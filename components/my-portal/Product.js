import {
  faEllipsisH,
  faPlus,
  faSearch,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Product() {
  return (
    <div>
      <div className="container ">
        <div className="d-flex  justify-content-between pt-3 mb-5">
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
            <div className="btn-create-client">
              <span className="btn-contain-icon">
                <FontAwesomeIcon className="btn-create-icon" icon={faPlus} />
              </span>
              <button className="btn btn-create">Add New Product</button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-2">
          <div>
            <button className="btn btn-transparent">Published</button>
          </div>
          <div>
            <button className="btn btn-transparent">Drafted</button>
          </div>
          <div>
            <button className="btn btn-transparent">Archived</button>
          </div>
        </div>
        <div className="d-none d-md-flex justify-content-around">
          <div>
            <p>Product Name</p>
          </div>
          <div>
            <p>Stock</p>
          </div>
          <div>
            <p>Price</p>
          </div>
          <div>
            <p>Category</p>
          </div>
          <div>
            <p>Views</p>
          </div>
          <div>
            <p>Date</p>
          </div>
          <div>
            <p>Status</p>
          </div>
          <div>
            <p>Action</p>
          </div>
        </div>
        <div className=" border-white px-0 ">
          <div className="table-responsive-row d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 px-3 px-md-0 border-bottom">
            <div className="pl-md-3  d-flex  align-items-center">
              <div className="imag mr-3">{/* <img src="" alt="" /> */}</div>
              <div>
                <p className="m-0">Keto Diet Video</p>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Stock</span>
              <p className="text-success m-0">In-Stock</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Price</span>
              <p className="m-0">$5.99</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Category</span>
              <p className="m-0">Science</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Views</span>
              <p className="m-0">31</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Date</span>
              <p className="m-0">06-03-2022</p>
            </div>
            <div className="d-flex justify-content-between">
              <span className="d-md-none">Status</span>
              <p className="bg-success rounded m-0">Published</p>
            </div>
            <div className=" pr-4 d-flex justify-content-end">
              <span>
                <FontAwesomeIcon className="icon-setting" icon={faEllipsisH} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
