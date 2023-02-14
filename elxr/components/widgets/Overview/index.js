import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";

import Card from "@/elxr/components/bits/Card";
import Header from "@/elxr/components/bits/text/Header";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import { useSubscriptions } from "@/elxr/hooks/api/subscriptions";
import { useMembers } from "@/elxr/hooks/api/members";
import { useCourses } from "@/elxr/hooks/api/courses";
import { useCommunities } from "@/elxr/hooks/api/communities";
import { padWithZeros } from "@/elxr/helpers/strings";

import {
  cardCSS,
  headerCSS,
  spinnerCSS,
  CardContents,
  OverviewItem,
  OverviewItemTitle,
  OverviewItemCount,
} from "./styles";

const OverviewWidget = () => {
  const { user } = useContext(UserContext);
  const {
    data: { data: subscriptions } = [],
    isValidating: loadingSubscriptions,
  } = useSubscriptions();
  const { data: following = [], isLoading: loadingFollowing } = useMembers({
    user_id: user?.id,
    scope: "following",
  });

  const { data: courses = [], isLoading: loadingCourses } = useCourses({
    author: user?.id,
    status: "publish",
  });
  const { data: communities = [], isLoading: loadingCommunities } =
    useCommunities({
      scope: "personal",
      type: "active",
      show_hidden: true,
    });
  const loading =
    loadingSubscriptions ||
    loadingFollowing ||
    loadingCourses ||
    loadingCommunities;

  return (
    <Card css={cardCSS}>
      <Header sub="OVERVIEW" css={headerCSS} />

      {loading && <SpinnerLoader pd="pd-0" css={spinnerCSS} />}

      {!loading && (
        <CardContents>
          <OverviewItem>
            <OverviewItemCount>
              {padWithZeros(subscriptions.length, 2)}
            </OverviewItemCount>
            <OverviewItemTitle>Subscriptions</OverviewItemTitle>
          </OverviewItem>
          <OverviewItem>
            <OverviewItemCount>
              {padWithZeros(following.length, 2)}
            </OverviewItemCount>
            <OverviewItemTitle>Following</OverviewItemTitle>
          </OverviewItem>
          <OverviewItem>
            <OverviewItemCount>
              {!!courses.length ? padWithZeros(courses.length, 2) : "00"}
            </OverviewItemCount>
            <OverviewItemTitle>Courses</OverviewItemTitle>
          </OverviewItem>
          <OverviewItem>
            <OverviewItemCount>
              {padWithZeros(communities.length, 2)}
            </OverviewItemCount>
            <OverviewItemTitle>Communities</OverviewItemTitle>
          </OverviewItem>
        </CardContents>
      )}
    </Card>
  );
};

export default OverviewWidget;
