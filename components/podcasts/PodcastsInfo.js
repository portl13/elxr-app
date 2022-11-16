import React from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import { useSession } from "next-auth/react";
import AuthBox from "@components/shared/ui/AuthBox";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";

function PodcastsInfo({ audio, user }) {
  const { status } = useSession();
  return (
    <>
      <div
        className="ratio ratio-16x9 bg-gray card-head cover-bg bg-gray border-radius-17"
        style={{
          backgroundImage: `url(${audio?.thumbnail || audio?.cover})`,
        }}
      ></div>
      {audio?.audio && (
        <div className="audio-container w-100 d-flex">
          <audio className="w-100" src={audio.audio} controls />
        </div>
      )}
      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <h4 className="font-weight-bold mt-4 mb-2 flex-grow">{audio?.title}</h4>
        <div className="flex-shrink d-flex align-items-center">
          {audio && <SaveButton value={audio?.id} type="podcast" />}
          <SharedButton title={audio?.title} />
        </div>
      </div>
      {audio && (
        <CategoryAndTags category={audio?.category} tags={audio?.tags} />
      )}

      {status === "unauthenticated" && status !== "loading" && audio.type === 'subscribers' ? (
        <AuthBox />
      ) : null}

      {!audio?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={audio?.author} user={user} />
      ) : null}

      {audio.description ? (
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{
            __html: audio?.description,
          }}
        />
      ) : null}
      {audio && audio.author && <ChannelCardMedia is_subscribed={audio?.is_subscribed} author={audio.author} />}
    </>
  );
}

export default PodcastsInfo;
