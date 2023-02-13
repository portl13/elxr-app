import React from "react";
import moment from "moment";

import SpinnerLoader from "@/components/shared/loader/SpinnerLoader";

import Card from "@/elxr/components/bits/Card";
import TextLink from "@/elxr/components/bits/text/TextLink";
import ViewAllLink from "@/elxr/components/bits/buttons/ViewAllLink";

import { stripHtmlTags } from "@/elxr/lib/html-sanitizer";

import * as S from "./styles";

const mockedData = { data: [] };

const UnreadMessagesWidget = () => {
  //TODO Missing unreadmessages API
  const { data: unreadMessages = [], isValidating: loading } = mockedData;

  return (
    <Card css={S.cardCSS}>
      <S.HeaderSection>
        <S.Header sub={unreadMessages.length}>Unread Messages</S.Header>

        <ViewAllLink href="/notifications" />
      </S.HeaderSection>

      {loading && <SpinnerLoader />}

      {!loading && !unreadMessages?.length && (
        <S.NoResults>No unread messages.</S.NoResults>
      )}

      {!loading && !!unreadMessages?.length && (
        <>
          <S.MessagesList>
            {unreadMessages.map((unreadMessage) => {
              // Removes html and only leaves text
              const message = stripHtmlTags(unreadMessage.description.rendered);
              const href = stripHtmlTags(unreadMessage.link_url);

              return (
                <S.MessageItem key={unreadMessage.id}>
                  <TextLink href={href}>{message}</TextLink>
                  <S.TimeAgo>{moment(unreadMessage.date).fromNow()}</S.TimeAgo>
                </S.MessageItem>
              );
            })}
          </S.MessagesList>
        </>
      )}
    </Card>
  );
};

export default UnreadMessagesWidget;
