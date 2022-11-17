import {
  faEllipsisV,
  faPause,
  faPlay,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const formatTime = (duration) => {
  if (!duration) return;
  const min = parseInt(duration / 60, 10);
  const sec = parseInt(duration % 60);
  return `${min}:${sec < 10 ? "0" + String(sec) : sec}`;
};
const formatTimeCurrent = (currentTime) => {
  let mins = Math.floor(currentTime / 60);
  let secs = Math.floor(currentTime % 60);
  return `${mins}:${secs < 10 ? "0" + String(secs) : secs}`;
};

function SongPlayer({ song, play, audioRef, playMusic }) {
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [currentTimeProgress, setcurrentTimeProgress] = useState(0);

  const playMuted = () => {
    setMuted(!muted);
    const music = muted
      ? (audioRef.current.muted = false)
      : (audioRef.current.muted = true);
  };

  const updateTime = () => {
    setcurrentTimeProgress(
      (audioRef.current.currentTime * 100) / audioRef.current.duration
    );
    setCurrentTime(formatTimeCurrent(audioRef.current.currentTime));
  };

  return (
    <div className="container mt-4">
      <audio
        loop
        ref={audioRef}
        onTimeUpdate={updateTime}
        src={song.song.url}
      ></audio>

      <div className="custom-play ">
        {song?.title ? (
          <div className="custom-play-title">{song.title}</div>
        ) : null}
        <div className="custom-play-icon">
          {play ? (
            <i onClick={playMusic}>
              {" "}
              <FontAwesomeIcon className="icon-player" icon={faPause} />{" "}
            </i>
          ) : (
            <i onClick={playMusic}>
              <FontAwesomeIcon className="icon-player" icon={faPlay} />{" "}
            </i>
          )}
        </div>
        <div className="custom-time-currem d-none d-md-block">
          {currentTime} / {song?.song?.length_formatted}
        </div>
        <div className="custom-play-duration">
          <div className="current-time"></div>
          <div
            style={{
              width: `${currentTimeProgress}%`,
            }}
            className="current-time progress"
          ></div>
        </div>
        <div className="custom-volumen-icon d-none d-md-block">
          {muted ? (
            <i onClick={playMuted}>
              <FontAwesomeIcon className="icon-player" icon={faVolumeMute} />
            </i>
          ) : (
            <i onClick={playMuted}>
              <FontAwesomeIcon className="icon-player" icon={faVolumeDown} />
            </i>
          )}
        </div>
        <div className="custom-play-duration ">
          {song?.song?.length_formatted}
        </div>
      </div>
    </div>
  );
}

export default SongPlayer;
