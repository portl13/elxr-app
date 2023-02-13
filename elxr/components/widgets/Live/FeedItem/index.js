import React from "react";
import ShareIcon from "@/elxr/components/assets/svg/icons/Share";
import Divider from "@/elxr/components/bits/divider";
import SharePost from "@/elxr/components/bits/SharePost";
import ProfilePicture from "@/elxr/components/bits/ProfilePicture";
import { useComments } from "@/elxr/hooks/api/comments";

import { stripHtmlTags } from "@/elxr/lib/html-sanitizer";
import useEvent from "@/elxr/hooks/useEvent";

import moment from "moment";

import Comments from "../Comments";

import {
  ProfileSection,
  PostInfo,
  FeedTime,
  ProfileName,
  FeedText,
  FeedInfo,
  Dot,
  FeedNumbers,
  Repost,
  FeedContainer,
  CommentsCounter,
  FeedImage,
  shareActionsCSS,
  dividerCss,
} from "./styles";

const FeedItem = (props) => {
  const { item } = props;
  const { date } = item;
  const [showComments, setShowComments] = React.useState(false);
  // increase the comment counter without refresh the feed query
  const [commentsCounter, setCommentsCounter] = React.useState(
    item.comment_count
  );

  const {
    data: commentsData = [],
    isValidating: loading,
    mutate,
  } = useComments(commentsCounter > 0 ? item.id : null);

  const [showShare, setShowShare] = React.useState(false);

  // Removes html and only leaves text
  const message = React.useMemo(
    () => stripHtmlTags(item.content?.rendered),
    [item.content?.rendered]
  );

  const postDate = React.useMemo(
    () => moment(date).endOf("day").fromNow(),
    [date]
  );

  const handleShowComments = useEvent(() => {
    setShowComments((prevShowComments) => !prevShowComments);
  });

  const handleIncreaseComments = useEvent(() => {
    setCommentsCounter((prevCommentsCounter) => prevCommentsCounter + 1);
  });

  return (
    <FeedContainer>
      <ProfileSection>
        <ProfilePicture
          src={item.user_avatar?.thumb}
          alt={`${item.name} user pictue`}
        />
        <PostInfo>
          <ProfileName>{item.name}</ProfileName>
          <FeedTime>{postDate}</FeedTime>
        </PostInfo>
      </ProfileSection>
      <FeedText>{message}</FeedText>
      <FeedImage src={item.feature_media} alt="Feed image" />
      <FeedInfo>
        <FeedNumbers>
          <div>{item.favorite_count} Likes </div>
          <Dot />
          <CommentsCounter onClick={handleShowComments}>
            {commentsCounter} comments
          </CommentsCounter>
        </FeedNumbers>

        <Repost onClick={() => setShowShare(!showShare)}>
          <ShareIcon /> Repost
        </Repost>
      </FeedInfo>
      {showShare && (
        <SharePost
          css={shareActionsCSS}
          cardId={item.id}
          title={item.title}
          rendered={item.content.rendered}
        />
      )}

      {showComments && (
        <Comments
          postId={item.id}
          onCloseComments={handleShowComments}
          comments={commentsData?.comments}
          mutate={mutate}
          loading={loading}
          handleIncreaseComments={handleIncreaseComments}
        />
      )}
      <Divider css={dividerCss} />
    </FeedContainer>
  );
};

export default FeedItem;
