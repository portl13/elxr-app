import React, { useContext, useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import useSWR from "swr";
import { getCreator, getFetchPublic } from "@request/creator";
import CardAudio from "@components/creator/cards/CardAudio";
import { UserContext } from "@context/UserContext";
import { useSession } from "next-auth/react";
import AlbumCreator from "@components/album/AlbumCreator";
import SongCreator from "@components/song/SongCreator";
import EpisodeCreator from "@components/podcasts/EpisodeCreator";
import PodcastCreator from "@components/podcasts/PodcastCreator";

const podcastslUrl = `${process.env.apiV2}/podcasts/private?author=`;

const albumsUrl = `${process.env.apiV2}/albums/private?author=`;
const episodeUrl = `${process.env.apiV2}/episodes/private?author=`;

function PodcastsTab({ creator_id }) {
  const { user } = useContext(UserContext);
  const { status } = useSession();

  const { data: albums, error: errorAlbum } = useSWR(
    `${podcastslUrl}${creator_id}&page=1&per_page=${2}&single=true&with_songs=true`,
    getCreator
  );


  const { data: episodes, error: errorEpisodes } = useSWR(
    `${episodeUrl}${creator_id}&page=1&per_page=${4}&single=true`,
    getCreator
  );

  const isLoadingAlbum = !albums && !errorAlbum;
  const isLoadingSong = !episodes && !errorEpisodes;

  return (
    <>
      <section className={"mt-5"}>
        <h4 className="font-size-14 text-uppercase">podcast</h4>
      </section>
      {isLoadingAlbum ? <SpinnerLoader /> : null}
      {isLoadingSong ? <SpinnerLoader /> : null}
      {!isLoadingAlbum
        ? albums.map((podcast) => (
            <PodcastCreator
              vendor_id={creator_id}
              status={status}
              key={podcast.id}
              podcast={podcast}
              user={user}
            />
          ))
        : null}
      <h4 className="font-size-14 mt-5 text-uppercase">episodes</h4>
      <div className="row">
        {!isLoadingSong
          ? episodes.map((episode) => (
              <div key={episode.id} className={"col-6"}>
                <EpisodeCreator
                  status={status}
                  vendor_id={creator_id}
                  user={user}
                  episode={episode}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default PodcastsTab;
