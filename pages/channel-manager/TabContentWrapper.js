import React from "react";
import { Button } from "reactstrap";
import Home from "@components/channelManager/home";
import Customers from "@components/channelManager/Customers";
import Payments from "@components/channelManager/Payments";
import AddProduct from "@components/channelManager/AddProduct";
import Orders from "@components/channelManager/Orders";
import Products from "@components/channelManager/Products";
import Subscriber from "@components/channelManager/Subscriber";
import SubSetting from "@components/channelManager/SubSetting";
import EditProduct from "@components/channelManager/EditProduct";
import GoLive from "@components/channelManager/golive";
import Social from "@components/channelManager/social";
import SubscriberDetail from "@components/channelManager/SubscriberDetail";
import CustomerDetails from "@components/channelManager/CustomerDetails";
import EditEvent from "@components/channelManager/golive/EditEvent";

import OrderDetails from "@components/channelManager/OrderDetails";
function TabContentWrapper(props) {
  const {
    setTab,
    tab,
    user,
    handleRedirect,
    innerNav,
    hide,
    setHide
  } = props;
  return (
      <div className="main-container-tag">
        <div className="wcfm-collapse mt-0">
          {tab === "golive" && <GoLive {...props} />}
          {tab === "home" && <Home {...props} />}
          {tab === "product" && (
            <Products
              user={user}
              handleRedirect={handleRedirect}
              innerNav={innerNav}
            />
          )}
          {tab === "setting" && (
            <SubSetting
              user={user}
              handleRedirect={handleRedirect}
              setHide={setHide}
              hide={hide}
            />
          )}
          {tab === "subscriber" && (
            <Subscriber
              user={user}
              handleRedirect={handleRedirect}
              innerNav={innerNav}
            />
          )}
          {tab === "order" && (
            <Orders
              user={user}
              handleRedirect={handleRedirect}
              innerNav={innerNav}
            />
          )}
          {tab === "customer" && <Customers {...props} />}
          {tab === "payment" && <Payments />}
          {tab === "addproduct" && (
            <AddProduct
              user={user}
              setTab={setTab}
              handleRedirect={handleRedirect}
            />
          )}
          {tab === "editproduct" && (
            <EditProduct
              user={user}
              setTab={setTab}
              handleRedirect={handleRedirect}
              hideProduct={hide}
              setHide={setHide}
            />
          )}
          {tab === "social" && <Social {...props} />}
          {tab === "customer-detail" && (
            <CustomerDetails handleRedirect={handleRedirect} />
          )}
          {tab === "order-detail" && (
            <OrderDetails handleRedirect={handleRedirect} />
          )}
          {tab === "edit-event" && (
            <EditEvent
              user={user}
              handleRedirect={handleRedirect} />
          )}
          {tab === "subscriber-detail" && (
            <SubscriberDetail handleRedirect={handleRedirect} />
          )}
        </div>
      </div>
  );
}
export default TabContentWrapper;
