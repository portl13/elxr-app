import SongAuthorCard from "@components/main/card/SongAuthorCard";
import SongDetailCard from "@components/main/card/SongDetailCard";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import SongPlayer from "@components/song/SongPlayer";
import SongsRelated from "@components/song/SongsRelated";
import { getFetchPublic } from "@request/creator";
import React, { useRef, useState } from "react";
import useSWR from "swr";
import AlbumRelated from "./AlbumRelated";
// import SongsRelated from "./SongsRelated";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/album`;

function AlbumDetail({ id }) {
  const audioRef = useRef();
  const { data: album, error } = useSWR(`${url}/${id}`, getFetchPublic);
  const [play, setPlay] = useState(false);
  const isLoading = !album && !error;

  const playMusic = () => {
    setPlay(!play);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12  col-xl-10">
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <SongDetailCard
              playMusic={playMusic}
              audioRef={audioRef}
              play={play}
              setPlay={setPlay}
              song={album}
            />
          )}
           
            {album && album.songs.map((song) =>(
                <SongPlayer
                key={song.id}
                playMusic={playMusic}
                audioRef={audioRef}
                play={play}
                setPlay={setPlay}
                song={song}
              />
            ) ) }
         
          {album && album.author && (
            <SongAuthorCard author={album.author} song={album} />
          )}
        </div>

        <div className="col-12  col-xl-2">
          <div className="relative-items mt-4 mt-md-0">
            <h4 className="text-center text-capitazice">More like this</h4>
            {album && <AlbumRelated category={album?.category} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumDetail;
