import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/core";
import AuthButtons from "@components/home/AuthButtons";
import SubscriptionButton from "@components/shared/button/SubscriptionButton";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const albumCss = css`
  .single-song {
    display: grid;
    grid-template-columns: 20px 150px auto 60px;
    column-gap: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 20px 0;
    .index {
      padding-right: 30px;
    }
    .title {
      font-size: 14px;
    }
    .duration {
    }
  }
`;

const formatTimeCurrent = (currentTime) => {
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  return `${mins}:${secs < 10 ? "0" + String(secs) : secs}`;
};

const PlayButton = ({ play, playMusic }) => {
  return (
    <>
      {play ? (
        <i className={"pause"} onClick={playMusic}>
          {" "}
          <FontAwesomeIcon className="icon-player" icon={faPause} />{" "}
        </i>
      ) : (
        <i className={"play"} onClick={playMusic}>
          <FontAwesomeIcon className="icon-player" icon={faPlay} />{" "}
        </i>
      )}
    </>
  );
};

const AlbumListPlayer = ({ songs }) => {
  const audioRef = useRef();
  const rangeRef = useRef();
  const thumbRef = useRef();

  const [play, setPlay] = useState(false);
  const [currentTimeProgress, setcurrentTimeProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [currentSong, setCurrentSong] = useState({ id: "" });
  const [progressBarWidth, setProgressBarWidth] = useState();
  const [percentage, setPercentage] = useState(0);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);

  const [muted, setMuted] = useState(false);

  const updateTime = () => {
    setcurrentTimeProgress(
      (audioRef.current.currentTime * 100) / audioRef.current.duration
    );
    setCurrentTime(formatTimeCurrent(audioRef.current.currentTime));
  };
  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;

    setPercentage(e.target.value);
  };
  const getCurrentDuration = (e) => {
    const percent =((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(formatTimeCurrent(time))
    
  }

  useEffect(() => {
    const rangeWidth = rangeRef.current
      ? rangeRef.current.getBoundingClientRect().width
      : null;
    const thumbWidth = thumbRef.current
      ? thumbRef.current.getBoundingClientRect().width
      : null;

    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setMarginLeft(centerThumb);
    setPosition(percentage.toString());
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);

  const playMuted = () => {
    setMuted(!muted);
    const music = muted
      ? (audioRef.current.muted = false)
      : (audioRef.current.muted = true);
  };

  const playMusic = () => {
    setPlay((prev) => !prev);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };

  const playFirst = (song) => {
    if (song.id !== currentSong.id) {
      setPlay(true);
      setcurrentTimeProgress(0);
      audioRef.current.pause();
      setCurrentSong(song);
      audioRef.current.src = song.song.url;
      audioRef.current.play();
    }
  };

  const nextSong = () => {
    const indexCurrentSong = songs.findIndex(
      (song) => song.id === currentSong.id
    );

    if (indexCurrentSong < 0) return;

    const nextMusic = indexCurrentSong + 1;

    if (nextMusic === songs.length) {
      setCurrentSong({ id: "" });
      return;
    }

    playFirst(songs[nextMusic]);
  };

  return (
    <>
      <audio 
      ref={audioRef}
      onLoadedData={(e) => {
        setDuration(e.currentTarget.duration.toFixed(2))
      }}
      onTimeUpdate={getCurrentDuration}
      />
      {songs.map((song, index) => (
        <div
          onClick={() => playFirst(song)}
          className="single-song pointer"
          key={song.id}
        >
          <span className="index text-muted">
            {currentSong.id === song.id ? (
              <PlayButton play={play} playMusic={playMusic} />
            ) : (
              <i className={"pause"}>
                {" "}
                <FontAwesomeIcon className="icon-player" icon={faPlay} />{" "}
              </i>
            )}
          </span>
          <span className="title text-ellipsis">{song.title}</span>
          {currentSong.id === song.id ? (
             <>
             <div className="slider-container d-none d-md-flex">
              <div className=" progress-bar-cover player"
              style={{
                  width: `${progressBarWidth}px`}}></div>

              <div
                    className="thumb"
                    ref={thumbRef}
                    style={{
                      left: `${position}%`,
                      marginLeft: `${marginLeft}px`,
                    }}
              ></div> 

              <input
                onChange={onChange}
                type="range"
                className="sliderbar d-none d-md-flex "
                id="myRange"
                step="0.01"
                ref={rangeRef}
                value={position}
              />
             </div>
              
             </>
            ) : null}
          <span className="duration text-muted">
            {song?.song?.length_formatted}
          </span>
        </div>
      ))}
    </>
  );
};

const SongListNoPlayer = ({ song, index }) => {
  return (
    <div className="single-song">
      <span className="index text-muted">{index + 1}</span>
      <span className="title">{song.title}</span>
      <span className="duration text-muted">
        {song?.song?.length_formatted}
      </span>
    </div>
  );
};

function AlbumCreator({ album, user, status, vendor_id }) {
  const formatMin = (songs) => {
    const min = songs.map((e) => e.song.length).reduce((p, c) => p + c, 0) / 60;
    return Math.floor(min);
  };
  return (
    <section css={albumCss} className={"row mb-5 mt-5"}>
      <div className="col-3">
        <div
          className="ratio ratio-1x1  cover-bg bg-gray border-radius-17"
          style={{
            backgroundImage: `url(${album?.thumbnail})`,
          }}
        ></div>
        <div className={"mt-3 text-uppercase font-size-14 text-muted"}>
          <span className={"song-length"}>{album?.songs?.length} songs,</span>
          <span> {formatMin(album.songs)} minutes</span>
        </div>
      </div>
      <div className="col-9">
        <h3 className={"font-size-22 mb-2"}>
          <Link href={`/album/${stringToSlug(album.title)}/${album.id}`}>
            {album.title}
          </Link>
        </h3>
        <span className={"d-block mb-4 text-muted text-uppercase font-size-12"}>
          {album.category}
        </span>
        {album.type === "subscribers" && album?.songs.length > 0
          ? album?.songs?.map((song, index) => (
              <SongListNoPlayer key={song.id} song={song} index={index} />
            ))
          : null}

        {album.type === "open" && album?.songs.length > 0
          ? album?.songs && <AlbumListPlayer songs={album?.songs} />
          : null}

        {status === "unauthenticated" &&
        status !== "loading" &&
        album.type === "subscribers" ? (
          <>
            this content is private and only available to users of the platform.
            <AuthButtons classNameContainer={"mt-2"} />
          </>
        ) : null}
        {user && !album?.is_subscribed ? (
          <SubscriptionButton vendor_id={vendor_id} user={user} />
        ) : null}
      </div>
    </section>
  );
}

export default AlbumCreator;
