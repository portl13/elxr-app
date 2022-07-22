import CardAudio from "@components/creator/cards/CardAudio";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`;

function SectionPodcasts() {
  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=4`,
    getFetchPublic
  );
  const isLoading = !audios && !error;

  return (
    <>
      <div className="row mt-4">
         <div className="col-12">
          <h4 className="font-size-14">PODCASTS</h4>
        </div> 
        {isLoading && <SpinnerLoader/>}
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
    </>
  );
}

export default SectionPodcasts;
