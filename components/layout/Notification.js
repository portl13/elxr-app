import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";

const notifications = process.env.bossApi + "/notifications";

function Notification({ user, className = "" }) {
  const token = user?.token;
  const { data } = useSWR(token ? [notifications, token] : null, genericFetch, {
    revalidateOnFocus: false
  });
  return (
    <>
      {data?.length > 0 && (
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
