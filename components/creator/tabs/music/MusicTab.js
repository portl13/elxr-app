import React, {useContext} from "react";
import AlbumCreator from "@components/album/AlbumCreator";
import useSWR from "swr";
import { getCreator } from "@request/creator";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SongCreator from "@components/song/SongCreator";
import {UserContext} from "@context/UserContext";
import {useSession} from "next-auth/react";
const albumsUrl = `${process.env.apiV2}/albums/private?author=`;
const songsUrl = `${process.env.apiV2}/songs/private?author=`;

function MusicTab({ creator_id }) {
    const { user } = useContext(UserContext)
    const { status } = useSession();
  const { data: albums, error: errorAlbum } = useSWR(
    `${albumsUrl}${creator_id}&page=1&per_page=${2}&single=true&with_songs=true`,
    getCreator
  );
  const { data: songs, error: errorSongs } = useSWR(
    `${songsUrl}${creator_id}&page=1&per_page=${4}&single=true`,
    getCreator
  );

  const isLoadingAlbum = !albums && !errorAlbum;
  const isLoadingSong = !songs && !errorSongs

  return (
    <>
      <section className={"mt-5"}>
        <h4 className="font-size-14">ALBUMS</h4>
      </section>
      {isLoadingAlbum ? <SpinnerLoader /> : null}
      {isLoadingSong ? <SpinnerLoader /> : null}
      {!isLoadingAlbum
        ? albums.map((album) => (
            <AlbumCreator vendor_id={creator_id} status={status} key={album.id} album={album} user={user} />
          ))
        : null}
        <h4 className="font-size-14 mt-5">SONGS</h4>
      <div className="row">
        {!isLoadingSong ? (
            songs.map(song => (
                <div key={song.id} className={"col-6"}>
                  <SongCreator status={status} vendor_id={creator_id} user={user} song={song} />
                </div>
            ))
        ) : null}
      </div>
    </>
  );
}

export default MusicTab;
