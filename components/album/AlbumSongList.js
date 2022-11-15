import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

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

const MutedButton = ({ muted, playMuted }) => {
  return (
    <>
      {muted ? (
        <i onClick={playMuted}>
          <FontAwesomeIcon className="icon-player" icon={faVolumeMute} />
        </i>
      ) : (
        <i onClick={playMuted}>
          <FontAwesomeIcon className="icon-player" icon={faVolumeDown} />
        </i>
      )}
    </>
  );
};

const ProgressSong = ({ currentTimeProgress }) => {
  return (
    <>
      <div className="current-time"></div>
      <div
        style={{
          width: `${currentTimeProgress}%`,
        }}
        className="current-time progress"
      ></div>
    </>
  );
};

const CurrentTime = ({ currentTime, song }) => {
  return (
    <>
      {currentTime} / {song?.song?.media_details?.length_formatted}
    </>
  );
};

function AlbumSongList({ songs }) {
  const audioRef = useRef();
  const [play, setPlay] = useState(false);
  const [currentTimeProgress, setcurrentTimeProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [currentSong, setCurrentSong] = useState({ id: "" });

  const [muted, setMuted] = useState(false);

  const updateTime = () => {
    setcurrentTimeProgress(
      (audioRef.current.currentTime * 100) / audioRef.current.duration
    );
    setCurrentTime(formatTimeCurrent(audioRef.current.currentTime));
  };

  const playMuted = () => {
    setMuted(!muted);
    const music = muted
      ? (audioRef.current.muted = false)
      : (audioRef.current.muted = true);
  };

  const playMusic = () => {
    setPlay(prev => !prev);
    const music = play ? audioRef.current.pause() : audioRef.current.play();
  };

  const playFirst = (song) => {
    if (song.id !== currentSong.id) {
      setPlay(false)
      audioRef.current.pause()
      setCurrentSong(song);
      audioRef.current.src = song.song.url;
      playMusic()
    }
  };

  const nextSong = () => {
    const indexCurrentSong = songs.findIndex(song => song.id === currentSong.id)

    if (indexCurrentSong < 0) return;

    const nextMusic = indexCurrentSong + 1

    if (nextMusic === songs.length){
      setCurrentSong({id:''})
      return;
    }

    playFirst(songs[nextMusic])
  }

  return (
    <div className="container mt-4">
      <audio ref={audioRef} onEnded={()=>nextSong()} onTimeUpdate={updateTime}></audio>
      {songs.map((song, index) => (
        <div
          onClick={(e) => playFirst(song, e)}
          key={song.id}
          className={`custom-play list mb-2 pointer ${
            currentSong.id === song.id ? "active" : ""
          }`}
        >
          {song?.title ? (
            <div className="custom-play-title">
              <span className={"pr-3"}>{`${index + 1}`}.</span> {song.title}
            </div>
          ) : null}
          <div className="custom-play-icon position-relative">
            {currentSong.id === song.id ? (
              <PlayButton play={play} playMusic={playMusic} />
            ) : null}
          </div>
          <div className="custom-time-currem d-none d-md-block">
            {currentSong.id === song.id ? (
              <CurrentTime currentTime={currentTime} song={song} />
            ) : null}
          </div>
          <div className="custom-play-duration">
            {currentSong.id === song.id ? (
              <ProgressSong currentTimeProgress={currentTimeProgress} />
            ) : null}
          </div>
          <div className="custom-volumen-icon d-none d-md-block">
            {currentSong.id === song.id ? (
              <MutedButton muted={muted} playMuted={playMuted} />
            ) : null}
          </div>
          <div className="custom-play-duration ">
            {song?.song?.media_details?.length_formatted}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumSongList;
