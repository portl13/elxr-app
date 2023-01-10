import {
  faEllipsisV,
  faPause,
  faPlay,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

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
 const [percentage, setPercentage] = useState(0)
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState();
  
  const rangeRef = useRef();
  const thumbRef = useRef();

  const playMuted = () => {
    setMuted(!muted);
    const music = muted
      ? (audioRef.current.muted = false)
      : (audioRef.current.muted = true);
  };

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
  
    setPercentage(e.target.value)
    
  }

  const getCurrentDuration = (e) => {
    const percent =((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(formatTimeCurrent(time))
    
  }

  useEffect(( ) => {
    const rangeWidth =  rangeRef.current? rangeRef.current.getBoundingClientRect().width : null
    const thumbWidth = thumbRef.current?  thumbRef.current.getBoundingClientRect().width : null
    
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setMarginLeft(centerThumb);
    setPosition(percentage.toString());
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);
  
  return (
    <div className="container mt-4">
      <audio
        loop
        ref={audioRef}
        src={song.song.url}
        onTimeUpdate={getCurrentDuration}
        onLoadedData={(e) => {
        setDuration(e.currentTarget.duration.toFixed(2))
      }}
      ></audio>

      <div className="custom-play ">
        {song?.title ? (
          <div className="custom-play-title text-ellipsis">{song.title}</div>
        ) : null}
        <div className="custom-play-icon pointer">
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
          {currentTime} / {song?.song?.media_details.length_formatted}
        </div>


             <div className="slider-container-player">
              <div className=" progress-bar-cover player"
              style={{
                  width: `${progressBarWidth}px`}}></div>

              <div
                    className="thumb player"
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
