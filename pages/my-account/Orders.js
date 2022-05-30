import React, { useState, useEffect } from "react";
import { getOrder } from "../api/my-account/Order.api";
import Router from "next/router";
import OrderCard from "./OrderCard";
import { Spinner } from "reactstrap";
import Ordersview from "./OrdersView";

function Orders({ user, handleRedirect }) {
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState();
  const [page, setPage] = useState(1);
  const [per_page, setPerpage] = useState(10);
  useEffect(() => getOrderDetail(), []);
  function getOrderDetail() {
    getOrder(user, page, per_page)
      .then((res) => {
        setResult(res.data.data);
        setLoad(true);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <h3>Orders</h3>
      <div className="wc-MyAccount-inner-content">
        {!load && (
          <Spinner
            style={{ width: "1.2rem", height: "1.2rem" }}
            color="primary"
          />
        )}
        {result?.length > 0 && (
          <div className="datatable-ui">
            <div className="row-head">
              <div className="order-list-1">ORDER</div>
              <div className="order-list-2">DATE</div>
              <div className="order-list-3">STATUS</div>
              <div className="order-list-4">TOTAL</div>
              <div className="order-list-5">ACTIONS</div>
            </div>
            {result &&
              result.map((item, index) => {
                return (
                  <Ordersview
                    orderItem={item}
                    index={index}
                    id={item.id}
                    handleRedirect={handleRedirect}
                  />
                );
              })}
          </div>
        )}
        {result && result.length === 0 && (
          <div className="wc-MyAccount-fix-center">
            <div className="icon-tag">{load && <OrderCard />}</div>
            {load && result.length === 0 && (
              <div className="wc-tagline">No order has been made yet.</div>
            )}

            {/* <button className="button-tag" onClick={() => Router.push("/shop")}>
              Go to the shop
            </button> */}
          </div>
        )}
      </div>
    </>
  );
}
export default Orders;
