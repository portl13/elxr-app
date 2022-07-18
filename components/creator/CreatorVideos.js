import ChannelCardVideo from "@components/dashboard/channels/ChannelCardVideo";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { UserContext } from "@context/UserContext";
import { getCreator } from "@request/creator";
import React, { useContext } from "react";
import useSWR from "swr";

const videoUrl = `${process.env.apiV2}/video?author=`;

function CreatorVideos({ creator_id }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: videos, error } = useSWR(
    `${videoUrl}${creator_id}&page=1&per_page=4`,
    getCreator
  );
  const isLoading = !videos && !error;
  const mutateVideos = () => {};
  const mutateVideosEdit = () => {};

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">VIDEOS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {videos &&
        videos.videos &&
        videos.videos.length > 0 &&
        videos.videos.map((video) => (
          <ChannelCardVideo
            mutateVideos={mutateVideos}
            mutateVideosEdit={mutateVideosEdit}
            key={video.id}
            video={video}
            channel_id={video.channel_id}
            token={token}
          />
        ))}

      {videos && videos.videos && videos.videos.length === 0 && (
        <h3 className="col display-4">You have not created any videos yet</h3>
      )}
    </div>
  );
}

export default CreatorVideos;
