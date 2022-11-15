import SongCard from "@components/main/card/SongCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import { getFetchPublic } from "@request/creator";
import React from "react";
import useSWR from "swr";

const url = `${process.env.apiV2}/songs`;

function SongsRelated({ category }) {
  const { data: songs } = useSWR(
    `${url}?category=${category}&page=1&per_page=3`,
    getFetchPublic
  );
  return (
    <aside>
      {!songs && <SpinnerLoader />}
      {songs &&
        songs.songs.map((song) => (
          <div className="mb-4" key={song.id}>
            <SongCard tipo='song' item={song} />
          </div>
        ))}
    </aside>
  );
}

export default SongsRelated;
