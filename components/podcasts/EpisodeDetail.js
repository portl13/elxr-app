import { getFetchPublic } from "@request/creator";
import React, { useContext } from "react";
import useSWR from "swr";
import { UserContext } from "@context/UserContext";
import ChannelCardMedia from "@components/video/ChannelCardMedia";
import SkeletonMusic from "@components/SkeletonLoading/music/SkeletonMusic";
import EpisodeDetailCard from "@components/podcasts/EpisodeDetailCard";
import SongsRelated from "@components/song/SongsRelated";
import EpisodeRelated from "@components/podcasts/EpisodeRelated";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/episode`;

function EpisodeDetail({ id }) {
  const { user } = useContext(UserContext);
  const { data: episode, error } = useSWR(`${url}/${id}`, getFetchPublic);
  const isLoading = !episode && !error;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-xl-10">
          {isLoading ? (
            <SkeletonMusic />
          ) : (
            <EpisodeDetailCard user={user} episode={episode} />
          )}
          {episode && episode.author && (
            <ChannelCardMedia
              author={episode.author}
              is_subscribed={episode?.is_subscribed}
            />
          )}
        </div>
        <div className="col-12  col-xl-2">
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-capitazice">More like this</h4>
            {episode && <EpisodeRelated category={episode?.category_id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
