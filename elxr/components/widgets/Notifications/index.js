import React, { useContext } from "react";
import moment from "moment";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import Card from "@/elxr/components/bits/Card";
import TextLink from "@/elxr/components/bits/text/TextLink";
import Header from "@/elxr/components/bits/text/Header";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";

import { useNotifications } from "@/elxr/hooks/api/notifications";

import { stripHtmlTags } from "@/elxr/lib/html-sanitizer";

import {
  cardCSS,
  NotificationList,
  NotificationItem,
  NoResults,
  TimeAgo,
  HeaderSection,
} from "./styles";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import { genericFetch } from "@request/dashboard";

const basePath = `${process.env.baseUrl}/wp-json/buddyboss/v1/notifications`;

const NotificationsWidget = () => {
  const { userToken } = useContext(UserContext);
  const { data: notifications = [], isValidating: loading } = useSWR(
    userToken ? [basePath, userToken] : null,
    genericFetch
  );

  return (
    <Card css={cardCSS}>
      <HeaderSection>
        <Header sub="ACTION ITEMS">NOTIFICATIONS</Header>

        <ViewAllLink href="/notifications" />
      </HeaderSection>

      {loading && <SpinnerLoader />}

      {!loading && !notifications?.length && (
        <NoResults>No notifications yet!</NoResults>
      )}

      {!loading && !!notifications?.length && (
        <>
          <NotificationList>
            {notifications.map((notification) => {
              // Removes html and only leaves text
              const message = stripHtmlTags(notification.description.rendered);
              const href = stripHtmlTags(notification.link_url);

              return (
                <NotificationItem key={notification.id}>
                  <TextLink href={href}>{message}</TextLink>
                  <TimeAgo>{moment(notification.date).fromNow()}</TimeAgo>
                </NotificationItem>
              );
            })}
          </NotificationList>
        </>
      )}
    </Card>
  );
};

export default NotificationsWidget;
