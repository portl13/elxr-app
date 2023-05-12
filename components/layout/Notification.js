import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/dashboard";
import NotificationsIcon from '@icons/NotificationsIcon';

const notifications = process.env.bossApi + "/notifications?is_new=true&per_page=1";

function Notification({ user, className = '' }) {
  // const token = user?.token;
  // const { data } = useSWR(token ? [notifications, token] : null, genericFetch, {
  //   revalidateOnFocus: false
  // });
  return (
    <>
      {/* {data?.length > 0 && (
        <span className="red-alert-notification"></span>
      )} */}
      <NotificationsIcon className={className} />
    </>
  );
}

export default Notification;
