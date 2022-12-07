import React from "react";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SongCard from "@components/main/card/SongCard";

const url = `${process.env.apiV2}/episodes`;

function EpisodeRelated({ category }) {
    console.log(category)
  const { data: episode } = useSWR(
    `${url}?category=${category}&page=1&per_page=3`,
    getFetchPublic
  );
  return (
    <aside>
      {!episode && <SpinnerLoader />}
      {episode &&
        episode.episodes.map((episode) => (
          <div className="mb-4" key={episode.id}>
            <SongCard tipo="episode" item={episode} />
          </div>
        ))}
    </aside>
  );
}

export default EpisodeRelated;
