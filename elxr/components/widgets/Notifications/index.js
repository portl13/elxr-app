import React, { useContext } from "react";
import moment from "moment";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import Card from "@/elxr/components/bits/Card";
import TextLink from "@/elxr/components/bits/text/TextLink";
import Header from "@/elxr/components/bits/text/Header";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";

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
import { stringToSlug } from "@lib/stringToSlug";
import Scrollbars from "react-custom-scrollbars-2";

const basePath = `${process.env.baseUrl}/wp-json/buddyboss/v1/notifications`;

const NotificationsWidget = () => {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: notifications = [], isLoading: loading } = useSWR(
    token ? [basePath, token] : null,
    genericFetch
  );

  const redirect = (item) => {
    const action = item?.action;
    if (action === "new_message") {
      return `/messages/compose/${user.name}/${user.id}`;
    }
    if (action === "update_reply" || action === "comment_reply") {
      return `/activity/${item.item_id}`;
    }
    if (
      action === "member_promoted_to_admin" ||
      action === "membership_request_rejected" ||
      action === "member_promoted_to_mod"
    ) {
      return `/group/group_detail/${item.item_id}?tab=feeds`;
    }
    if (action === "membership_request_accepted") {
      return `/profile/${stringToSlug(user.name)}/${item.user_id}/connections`;
    }
    if (action === "group_invite") {
      return `/profile/${user.name}/${item.user_id}?key=community&tab=invitation`;
    }
    if (
      action === "new_membership_request" ||
      action === "friendship_request" ||
      action === "bb_connections_new_request"
    ) {
      return `/profile/${stringToSlug(user.name)}/${
        item.user_id
      }/connections?tab=request`;
    }
    if (action === "bbp_new_reply") getDiscussionId(item.link_url, user);

    return stripHtmlTags(item.link_url);
  };

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
            <Scrollbars
                universal
                renderView={(props) => <div {...props} className="scroll-inner" />}
                renderThumbVertical={(props) => (
                    <div {...props} className="thumb-vertical" />
                )}
            >
            {notifications.map((notification) => {
              const message = stripHtmlTags(notification.description.rendered);
              return (
                <NotificationItem key={notification.id}>
                  <TextLink href={redirect(notification)}>{message}</TextLink>
                  <TimeAgo>{moment(notification.date).fromNow()}</TimeAgo>
                </NotificationItem>
              );
            })}
            </Scrollbars>
          </NotificationList>
        </>
      )}
    </Card>
  );
};

export default NotificationsWidget;
