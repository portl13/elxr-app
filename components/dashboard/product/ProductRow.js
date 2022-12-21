import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { getFormat, getFormatedDateFromDate } from "@utils/dateFromat";
import ProductActions from "./ProductActions";
import ProductModalDelete from "./ProductoModalDelete";
import Link from "next/link";

const statusData = {
  draft: {
    className: "bg-warning",
    text: "Draft",
  },
  pending: {
    className: "bg-warning",
    text: "Pending",
  },
  publish: {
    className: "bg-success",
    text: "Published",
  },
  private: {
    className: "bg-danger",
    text: "Private",
  },
};

function ProductRow({ product, mutateProducts }) {
  const view = 0
  const [open, setOpen] = useState(false);
  const { price, in_stock, date_created, name, status, categories } =
    product;


  return (
    <>
      <div className="table-responsive-row d-flex flex-column flex-md-row  align-items-md-center py-4 px-3  border-bottom">
        <div className="d-flex  align-items-center product">
          <div className="d-flex justify-content-center">
            <div
              style={{
                backgroundImage: `url(${product?.images[0]?.src})`,
              }}
              className="imag cover-bg"
            ></div>
          </div>
          <div className="ml-3">
            <p className="m-0">{name}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between stock">
          <span className="d-md-none">Stock</span>
          <p
            className={` m-0 ${
                in_stock  ? "text-success" : "text-warning"
            }`}
          >
            {" "}
            {in_stock ? "In-Stock" : "Out of Stock"}
          </p>
        </div>
        <div className="d-flex justify-content-between price">
          <span className="d-md-none">Price</span>
          <p className="m-0">${price}</p>
        </div>
        <div className="d-flex justify-content-between category">
          <span className="d-md-none">Category</span>
          <p className="m-0">
            {categories.map((category) => category.name).join(", ")}
          </p>
        </div>
        <div className="d-flex justify-content-between justify-content-md-center views">
          <span className="d-md-none">Views</span>
          <p className="m-0">{view}</p>
        </div>
        <div className="d-flex justify-content-between date">
          <span className="d-md-none">Date</span>
          <p className="m-0">{getFormat(date_created, "MM-dd-yyyy")}</p>
        </div>
        <div className="d-flex justify-content-between status">
          <span className="d-md-none">Status</span>
          <p
            className={`${statusData[status].className} rounded-pill m-0 px-3`}
          >
            {statusData[status].text}
          </p>
        </div>
        <div className="d-flex justify-content-end justify-content-md-center action position-relative">
          <ProductActions
            product={product}
            openDeleteModal={open}
            setOpenDeleteModal={setOpen}
            className="d-none d-md-block"
          />
          <div className="card-footer-actions d-md-none mt-4">
            <Link href={`/dashboard/products/edit-product/${product.id}`}>
              <a className="btn btn-action primary">Edit</a>
            </Link>
            <div
              onClick={() => setOpen(!open)}
              className="btn btn-action danger"
            >
              Delete
            </div>
            <div className="btn btn-action">View</div>
          </div>
        </div>
      </div>
      {open && <ProductModalDelete
          mutateProducts={mutateProducts}
          open={open}
          setOpen={setOpen}
          product={product}
      />}
    </>
  );
}

export default ProductRow;
