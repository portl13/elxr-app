import React, { useContext, useEffect, useState } from "react";
import Meta from "./Meta";
import Main from "./Main";
import { UserContext } from "@context/UserContext";
import { getMessageList } from "@api/message.api";
import { getNotificationDetails } from "@api/notification.api";
import { connectionRequest } from "@api/member.api";
import jwt_decode from "jwt-decode";
import Router from "next/router";

const Layout = ({ children, leftMenu = null, menuFooter = null, menuMobile = {type:"default"}, noMenu = true}) => {
  const { user, setUser } = useContext(UserContext);
  const [connections, setConnections] = useState(0);
  const [notifications, setNotifications] = useState(0);
  const [myMonnections, setMyConnection] = useState(0);
  const [stopLoad, setStopLoad] = useState(true);
  const [StopLoadNotification, setStopLoadNotification] = useState(true);
  const [StopLoadRequest, setStopLoadRequest] = useState(true);

  const logout = () => {
    Router.push("/");
  };
  useEffect(() => {
    const token = user?.token;
    //JWT check if token expired
    if (token) {
      let decoded = jwt_decode(token);
      const expirationTime = decoded.exp * 1000;
      if (Date.now() > expirationTime) {
        logout();
        setUser(JSON.parse(localStorage.getItem(null)));
      }
    }
  }, [user]);

  const formData = {
    user_id: user?.id,
    type: "unread",
  };

  const requestParams = {
    user_id: user?.id,
    friend_id: user?.id,
  };

  function getUnreadMsg() {
    getMessageList(user, formData)
      .then((res) => {
        let msgs =
          res.headers["bbp-unread-messages"] != undefined
            ? res.headers["bbp-unread-messages"]
            : null;
        setStopLoad(true);
        setConnections(msgs);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }
  // useEffect(() => {
  //   if (user?.id) {
  //     getUnreadMsg();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (stopLoad && user?.id) getUnreadMsg();
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [user]);

  function getUnreadNotification() {
    getNotificationDetails(user, formData)
      .then((res) => {
        const getNotifications = res.data.length;
        setStopLoadNotification(true);
        setNotifications(getNotifications);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  // useEffect(() => {
  //   if (user?.id) {
  //     getUnreadNotification();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (StopLoadNotification && user?.id) getUnreadNotification();
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [user]);

  function getPendingRequest() {
    connectionRequest(user, requestParams)
      .then((res) => {
        let total =
          res.headers["x-wp-total"] != undefined
            ? res.headers["x-wp-total"]
            : null;
        setStopLoadRequest(true);
        setMyConnection(total);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }
  // useEffect(() => {
  //   if (user?.id) {
  //     getPendingRequest();
  //   }
  // }, [user]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (StopLoadRequest && user?.id) getPendingRequest();
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [user]);

  return (
    <>
      <Meta />
      <Main
        children={children}
        leftMenu={leftMenu}
        menuMobile={menuMobile}
        noMenu={noMenu}
      />
    </>
  );
};
export default Layout;
