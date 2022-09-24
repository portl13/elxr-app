import React, { useState, useEffect } from "react";
import { getNotificationDetails } from "@api/notification.api";

function Notification({ user, className="" }) {
  const [notificationList, setNotificationList] = useState([]);

  const getList = () => {
    const data = {
      user_id: user?.id,
      sort_order: "DESC",
      per_page: 1,
    };
    getNotificationDetails(user, data)
      .then(({ data }) => {
        if (data) setNotificationList(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (user && user.id) {
      getList();
    }
  }, [user]);

  return (
    <>
      {notificationList.length > 0 && (
        <span className="red-alert-notification blinking"></span>
      )}
      <img
        src="/img/icons/right-header/notifications.png"
        className={className}
      />
    </>
  );
}

export default Notification;
