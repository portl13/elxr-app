import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import VideoContainer from "@components/video/VideoContainer";
import { useSession } from "next-auth/react";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";
import AuthBox from "@components/shared/ui/AuthBox";

function VideoInfo({ video, user }) {
  const { status } = useSession();
  return (
    <>
      {video && video?.is_subscribed ? (
        <VideoContainer video={video?.video} />
      ) : null}
      {video && !video?.is_subscribed ? (
        <div
          style={{
            backgroundImage: `url(${video.thumbnail})`,
          }}
          className="ratio ratio-16x9 pointer  bg-cover"
        >
          <span className="duration-video">
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          </span>
        </div>
      ) : null}

      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <h4 className="font-weight-bold mt-4 mb-2 flex-grow">{video?.title}</h4>
        <div className="flex-shrink d-flex align-items-center">
          {video && <SaveButton value={video?.id} type="video" />}
          <SharedButton title={video?.title} />
        </div>
      </div>

      {video && <CategoryAndTags category={video.category} tags={video.tags} />}

      {status === "unauthenticated" && status !== "loading" && video.type === 'subscribers' ? (
        <AuthBox />
      ) : null}
      {!video?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={video?.author} user={user} />
      ) : null}

      {video?.description ? (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: video?.description,
          }}
        />
      ) : null}

      {video && video.author && <ChannelCardMedia author={video.author} />}
    </>
  );
}

export default VideoInfo;
