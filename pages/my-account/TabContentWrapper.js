import React, { useState } from "react";
import Router from "next/router";
import AccountDetail from "./AccountDetail";
import Address from "./Address";
import Dashboard from "./Dashboard";
import Download from "./Download";
import Following from "./Following";
import Orders from "./Orders";
import Payment from "./Payment";
import Subscriptions from "./Subscriptions";
import EditAddress from "./EditAddress";
import Wallet from "./Wallet";
import Ordersdetails from "./OrdersDetails";
import WalletTransactions from "./WalletTransactions";
import WalletWithdrawl from "./WalletWithdrawl";
import EditShippingAddress from "./EditShippingAddress";
import AddPaymentMethod from "./AddPaymentMethod";
import LogoutModal from "./LogoutModal";
import { uploadModal } from "../../components/livefeed/photo.style";

function TabContentWrapper(props) {
  const { setTab, tab, user, handleRedirect, setUser, status, innerNav } =
    props;
  const [show, setShow] = useState(false);
  const signOut = () => {
    try {
      setUser(null);
      Router.push("/");
    } catch (error) {}
  };

  return (
    <>
      <div className="main-container-tag bg-black bd-radius">
        <div className="wcfm-collapse bsdatasection w-100">
          {tab === "dashboard" && (
            <Dashboard
              user={user}
              handleRedirect={handleRedirect}
              signOut={signOut}
            />
          )}
          {tab === "orders" && (
            <Orders user={user} handleRedirect={handleRedirect} />
          )}
          {tab === "orders-view" && (
            <Ordersdetails handleRedirect={handleRedirect} />
          )}
          {tab === "subscriptions" && (
            <Subscriptions user={user} handleRedirect={handleRedirect} />
          )}
          {tab === "downloads" && <Download user={user} />}
          {tab === "address" && (
            <Address user={user} handleRedirect={handleRedirect} />
          )}
          {tab === "payment-method" && (
            <Payment user={user} handleRedirect={handleRedirect} />
          )}
          {tab === "my-wallet" && (
            <Wallet
              user={user}
              handleRedirect={handleRedirect}
              innerNav={innerNav}
            />
          )}
          {tab === "followings" && <Following user={user} />}
          {tab === "account-details" && <AccountDetail user={user} />}
          {tab === "edit-address" && <EditAddress user={user} />}
          {tab === "shipping-address" && <EditShippingAddress user={user} />}
          {tab === "wallet-transaction" && <WalletTransactions />}
          {tab === "add-payment-method" && <AddPaymentMethod />}
          {tab === "wallet-withdrawl" && (
            <WalletWithdrawl
              handleRedirect={handleRedirect}
              innerNav={innerNav}
            />
          )}
        </div>
      </div>
      {show && (
        <LogoutModal
          show={show}
          uploadModal={uploadModal}
          setShow={setShow}
          parentTrigger={signOut}
        />
      )}
    </>
  );
}
export default TabContentWrapper;
