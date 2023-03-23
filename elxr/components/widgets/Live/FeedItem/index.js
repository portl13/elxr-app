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
  FeedInfo,
  Dot,
  FeedNumbers,
  Repost,
  FeedContainer,
  CommentsCounter,
  shareActionsCSS,
  dividerCss,
  MultiPhotoSection,
} from "./styles";
import FeedContent from "@/elxr/components/widgets/Live/FeedItem/FeedContent";
import FeedPhoto from "@/elxr/components/widgets/Live/FeedItem/FeedPhoto";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import jstz from "jstz";

const postedData = (date) => {
  const newDate = new Date(`${date}Z`);
  const timeZone = jstz.determine().name();
  const zonedDate = utcToZonedTime(newDate, timeZone);
  const posted = formatDistanceToNow(zonedDate, { addSuffix: true });
  return <> {posted === "less than a minute" ? `${posted} ago` : posted}</>;
};

const FeedItem = (props) => {
  const { item } = props;
  const { date, bp_media_ids } = item;
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

  const postDate = React.useMemo(() => postedData(date), [date]);

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

      <FeedContent activity={item} defaultContent={message} />

      {bp_media_ids?.length > 0 ? (
        <MultiPhotoSection
          className={`multi-photos-section  grid-${
            bp_media_ids.length >= 5 ? "5" : bp_media_ids.length
          }`}
        >
          {bp_media_ids.map((media, index) => (
            <React.Fragment key={media.id}>
              {index < 5 && (
                <FeedPhoto
                  index={index}
                  bp_media_ids={bp_media_ids}
                  media={media}
                />
              )}
            </React.Fragment>
          ))}
        </MultiPhotoSection>
      ) : null}

      <FeedInfo>
        <FeedNumbers>
          {/*<div>{item.favorite_count} Likes </div>*/}
          {/*<Dot />*/}
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
