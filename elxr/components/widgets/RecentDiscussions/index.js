import React from "react";
import moment from "moment";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import Card from "@/elxr/components/bits/Card";
import TextLink from "@/elxr/components/bits/text/TextLink";
import Header from "@/elxr/components/bits/text/Header";
import CheckIcon from "@/public/img/icons/check.svg";

import { useDiscussions } from "@/elxr/hooks/api/discussions";

import { stringToSlug } from "@/lib/stringToSlug";

import {
  cardCSS,
  NoResults,
  HeaderSection,
  Discussions,
  DiscussionItem,
  textLinkCSS,
} from "./styles";

const RecentDiscussionsWidget = () => {
  const { data: discussions = [], isValidating: loading } = useDiscussions({
    page: 1,
    per_page: 3,
    category: "",
    order: "desc",
  });

  const sortedDiscussions = React.useMemo(() => {
    return discussions?.sort((a, b) => moment(b.date) - moment(a.date));
  }, [discussions]);

  return (
    <Card css={cardCSS}>
      <HeaderSection>
        <Header>RECENT DISCUSSIONS</Header>
      </HeaderSection>

      {loading && <SpinnerLoader pd="p-2" />}

      {!loading && !discussions?.length && (
        <NoResults>No discussions yet!</NoResults>
      )}

      {!loading && !!discussions?.length && (
        <Discussions>
          {sortedDiscussions.map((discussion, index) => {
            return (
              <DiscussionItem key={discussion.id}>
                <CheckIcon />
                <TextLink
                  key={index}
                  href={_createDiscussionPath(discussion)}
                  css={textLinkCSS}
                >
                  {discussion.title?.rendered}
                </TextLink>
              </DiscussionItem>
            );
          })}
        </Discussions>
      )}
    </Card>
  );
};

function _createDiscussionPath(discussion) {
  const { name, id } = discussion.group;
  return `/group/${stringToSlug(name)}/${id}?tab=discusion&nav=${
    discussion.id
  }`;
}

export default RecentDiscussionsWidget;
