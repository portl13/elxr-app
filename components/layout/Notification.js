import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import NotificationsIcon from '@icons/NotificationsIcon';

const notifications = process.env.bossApi + "/notifications";

function Notification({ user }) {
  const token = user?.token;
  const { data } = useSWR(token ? [notifications, token] : null, genericFetch, {
    revalidateOnFocus: false
  });
  
  return (
    <>
      {data?.length > 0 && (
        <span className="red-alert-notification blinking"></span>
      )}
      <NotificationsIcon />
    </>
  );
}

export default Notification;
