import React, { useState, useEffect } from "react";
import { getOrder } from "../api/my-account/Order.api";
import RecentOrder from "./RecentOrders";
import { getAddress, setShippingAddress } from "../api/my-account/address.api";
import DashBoardCard from "./DashBoardCard";
import { getShippingAddress } from "../api/my-account/address.api";
import EditShippingAddress from "./EditShippingAddress";
import DashboardShippingcard from "./DashBoardShippingCard";

function Dashboard({ user, handleRedirect, signOut }) {
  const [load, setLoad] = useState(false);
  const [result, setResult] = useState();
  const [page, setPage] = useState(1);
  const [per_page, setPerpage] = useState(10);
  const [address, setAddress] = useState();
  const [shippingAdress, setShippingAddress] = useState()
  useEffect(() => {
    getOrderDetail();
    getAddressDetail();
  }, []);

  function getOrderDetail() {
    getOrder(user, page, per_page)
      .then((res) => {
        setResult(res.data.data);
        setLoad(true);
      })
      .catch((error) => console.log(error));
  }

  function getAddressDetail() {
    getAddress(user)
      .then((res) => setAddress(res.data.data))
      .catch((error) => console.log(error));
  }
  function getShippingAddressData() {
    getShippingAddress(user).then((res) => {
        setShippingAddress(res.data.data);
    })
}
useEffect(() => {
    getShippingAddressData()
}, []);

  return (
    <>
      <h2>Hello {user?.displayName}</h2>
      <p>
        Hello Woodlander (not {user?.displayName}?{" "}
        <a className="text-primary" onClick={() => signOut()}>Log out</a>)
      </p>
      <p>
        From your account dashboard you can view your{" "}
        <a className="text-primary" onClick={() => handleRedirect("orders")}>recent orders</a>, manage
        your{" "}
        <a className="text-primary" onClick={() => handleRedirect("address")}>
          shipping and billing addresses
        </a>
        , and{" "}
        <a className="text-primary" onClick={() => handleRedirect("account-details")}>
          edit your password and account details
        </a>
        .
      </p>
      {result?.length > 0 && (
        <div className="inner-sub-heading">RECENT ORDERS</div>
      )}
      {result?.length > 0 && (
        <div className="recent-order-table">
          <div className="recent-head">
            <div className="recent-col-1">ORDER</div>
            <div className="recent-col-2">DATE</div>
            <div className="recent-col-3">STATUS</div>
            <div className="recent-col-4">TOTAL</div>
            <div className="recent-col-5">ACTIONS </div>
          </div>
          {result &&
            result.map((item, index) => {
              return (
                <RecentOrder
                  orderItem={item}
                  index={index}
                  id={item.id}
                  handleRedirect={handleRedirect}
                />
              );
            })}
        </div>
      )}

      <div className="wc-MyAccount-inner-content">
        <div className="left-content">
          <div className="wc-Address-title">
            Billing address{" "}
            <a onClick={() => handleRedirect("edit-address")} className="edit-text">
              Edit
            </a>
          </div>
          {address && <DashBoardCard result={address} />}
        </div>
        <div className="right-content">
          <div className="wc-Address-title">
            SHIPPING ADDRESS{" "}
            <a onClick={() => handleRedirect("shipping-address")} className="edit-text">
              Edit
            </a>
          </div>
          {shippingAdress && <DashboardShippingcard shippingAdress={shippingAdress}/>}
        </div>
      </div>
    </>
  );
}
export default Dashboard;
