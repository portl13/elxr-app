import React, { useState, useEffect } from "react";
import { getOrder } from "../api/my-account/Order.api";
import Router from "next/router";
import OrderCard from "./OrderCard";
import { Spinner } from "reactstrap";
import Ordersview from "./OrdersView";
import { recentOrderStyle } from "./Dashboard";

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
      <div css={recentOrderStyle} className="wc-MyAccount-inner-content">
        {!load && (
          <Spinner
            style={{ width: "1.2rem", height: "1.2rem" }}
            color="primary"
          />
        )}
        {result?.length > 0 && (
          <div className="datatable-ui">
          <div className="recent-head">
            <div className="recent-head-item">ORDER</div>
            <div className="recent-head-item">DATE</div>
            <div className="recent-head-item">STATUS</div>
            <div className="recent-head-item">TOTAL</div>
            <div className="recent-head-item">ACTIONS </div>
          </div>
            {result &&
              result.map((item, index) => {
                return (
                  <Ordersview
                    key={item.id}
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
          </div>
        )}
      </div>
    </>
  );
}
export default Orders;
