import React, { useContext } from "react";
import moment from "moment";

import Card from "@/elxr/components/bits/Card";
import TextLink from "@/elxr/components/bits/text/TextLink";
import Header from "@/elxr/components/bits/text/Header";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

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
import { getTopicDetails } from "@api/discussion.api";
import Router from "next/router";
import { profileLink } from "@utils/links";

const basePath = `${process.env.baseUrl}/wp-json/buddyboss/v1/notifications?is_new=false&per_page=100`;

const getDiscussionId = (e, user) => {
  let url_string = e.replaceAll("#038;", "&");
  let url = new URL(url_string);
  let id = url.searchParams.get("topic_id");
  getTopicDetails(user, id).then((res) => {
    const { group } = res.data;
    Router.push(`/group/${group.name}/${group.id}?tab=discusion&nav=${id}`);
  });
};

const NotificationsWidget = () => {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: notifications = [], isLoading: loading } = useSWR(
    token ? [basePath, token] : null,
    genericFetch
  );

  const redirect = (item) => {
    const action = item?.action;
    if (action === "bb_following_new") {
      return profileLink("member", item.secondary_item_id);
    }
    if (action === "new_message" || action === "bb_messages_new") {
      return `/messages/compose/${stringToSlug(user.name)}/${user.id}`;
    }
    if (
      action === "update_reply" ||
      action === "comment_reply" ||
      action === "bb_activity_following_post"
    ) {
      return `/activity/${item.item_id}`;
    }
    if (
      action === "member_promoted_to_admin" ||
      action === "membership_request_rejected" ||
      action === "member_promoted_to_mod"
    ) {
      return `/group/group_detail/${item.item_id}?tab=feeds`;
    }
    if (action === "membership_request_accepted" || action === "friendship_accepted" || action === "bb_connections_request_accepted") {
      return `/profile/${stringToSlug(user.name)}/${item.user_id}/connections`;
    }
    if (action === "group_invite" || action === "bb_groups_new_invite") {
      return `/profile/${stringToSlug(user.name)}/${item.user_id}/community?tab=invitation`;
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

    return '/';
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
              renderView={(props) => (
                <div {...props} className="scroll-inner" />
              )}
              renderThumbVertical={(props) => (
                <div {...props} className="thumb-vertical" />
              )}
            >
              {notifications.map((notification) => {
                const message = stripHtmlTags(
                  notification.description.rendered
                );

                if(notification.action === "members_send_invites") return ""

                return (
                  <NotificationItem key={notification.id}>
                    <figure className={"mb-0"}>
                      <div
                        className={"bg-cover avatar"}
                        style={{
                          backgroundImage: `url(${notification?.avatar_urls?.thumb})`,
                        }}
                      ></div>
                    </figure>
                    <div>
                      <TextLink href={redirect(notification)}>
                        {message}
                      </TextLink>
                      <TimeAgo>{moment(notification.date).fromNow()}</TimeAgo>
                    </div>
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
