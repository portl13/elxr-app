import React, { useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import CardAudio from "@components/creator/cards/CardAudio";
const podcastslUrl = `${process.env.apiV2}/podcasts?author=`;

function PodcastsTab({ creator_id }) {
  const [page, setPage] = useState(1);
  const { data: audios, error } = useSWR(
    `${podcastslUrl}${creator_id}&page=${page}&per_page=12`,
    getFetchPublic
  );

  const isLoading = !audios && !error;
  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14">PODCASTS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardAudio audio={audio} />
          </div>
        ))}
      {audios && audios.audios && audios.audios.length === 0 && (
        <h3 className="col display-4">You have not created any podcasts yet</h3>
      )}
    </div>
  );
}

export default PodcastsTab;
