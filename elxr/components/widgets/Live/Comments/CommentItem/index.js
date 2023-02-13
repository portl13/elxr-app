import React from "react";
import moment from "moment";
import { stripHtmlTags } from "@/elxr/lib/html-sanitizer";

import ProfilePicture from "@/elxr/components/bits/ProfilePicture";

import {
  CommentContainer,
  ProfileName,
  ProfileInfo,
  CommentTime,
  CommentText,
} from "./styles";

const CommentItem = ({ comment }) => {
  const { date } = comment;

  const commentDate = React.useMemo(
    () => moment(date).endOf("day").fromNow(),
    [date]
  );

  // Removes html and only leaves text
  const message = React.useMemo(
    () => stripHtmlTags(comment.content?.rendered),
    [comment.content?.rendered]
  );

  return (
    <CommentContainer key={comment.id}>
      <ProfileInfo>
        <ProfilePicture
          src={comment.user_avatar.thumb}
          alt={`${comment.name} user pictue`}
        />
        <ProfileName>{comment.name}</ProfileName>
        <CommentTime>{commentDate}</CommentTime>
      </ProfileInfo>
      <CommentText>{message}</CommentText>
    </CommentContainer>
  );
};

export default CommentItem;
