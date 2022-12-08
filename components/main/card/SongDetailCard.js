import React, { useRef, useState } from "react";
import SaveButton from "@components/shared/action/SaveButton";
import SharedButton from "@components/shared/action/SharedButton";
import CategoryAndTags from "@components/shared/cards/CategoryAndTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import SongPlayer from "@components/song/SongPlayer";
import { useSession } from "next-auth/react";
import AuthBox from "@components/shared/ui/AuthBox";
import SubscriptionBox from "@components/shared/ui/SubscriptionBox";
import AlbumSongList from "@components/album/AlbumSongList";

function SongDetailCard({ song, user }) {
  const { status } = useSession();
  const audioRef = useRef();
  const [play, setPlay] = useState(false);
  const playMusic = () => {
    setPlay(!play);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };

  return (
    <>
      <article className="song-card-reponsive">
        <div>
          <div
            className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
            style={{
              backgroundImage: `url(${song?.thumbnail})`,
            }}
          ></div>
        </div>
        <div className="pl-lg-3">
          <h4 className="font-weight-bold mt-1  mb-0">{song?.title}</h4>
          <h5 className="text-primary m-0">{song?.channel_name}</h5>
          {song && (
            <CategoryAndTags category={song?.category} tags={song?.tags} />
          )}



          <div className="mt-2 flex-shrink d-flex justify-content-between align-items-center">
            {song?.song ? (
              <>
                {play ? (
                  <button
                    onClick={playMusic}
                    className="btn  btn-primary radius-sm text-capitalize "
                  >
                    <i className="pr-2">
                      <FontAwesomeIcon
                        className="icon-setting"
                        icon={faPause}
                      />
                    </i>
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={playMusic}
                    className="btn btn-primary text-capitalize "
                  >
                    <i className="pr-2">
                      <FontAwesomeIcon className="icon-setting" icon={faPlay} />
                    </i>
                    Play
                  </button>
                )}
              </>
            ) : null}
            <div className="d-flex">
              {song && <SaveButton value={song?.id} type="song" />}
              <SharedButton title={song?.title} />
            </div>
          </div>
          {song?.song && (
              <SongPlayer
                  playMusic={playMusic}
                  audioRef={audioRef}
                  play={play}
                  setPlay={setPlay}
                  song={song}
              />
          )}
        </div>
      </article>

      {song && song?.content ? (
          <div
              className="mt-3 editor-detail"
              dangerouslySetInnerHTML={{
                __html: song?.content,
              }}
          />
      ) : null}


      {status === "unauthenticated" &&
      status !== "loading" &&
      song.type === "subscribers" ? (
        <AuthBox />
      ) : null}

      {!song?.is_subscribed && user ? (
        <SubscriptionBox vendor_id={song?.author} user={user} />
      ) : null}



      {song?.lyric ? (
        <div className="pt-2">
          <h5 className="text-primary font-weight-bold">Lyrics</h5>
          <div
            className="mt-3 editor-detail"
            dangerouslySetInnerHTML={{
              __html: song?.lyric,
            }}
          />
        </div>
      ) : null}
      {song && song?.songs ? <AlbumSongList songs={song?.songs} /> : null}
    </>
  );
}

export default SongDetailCard;
