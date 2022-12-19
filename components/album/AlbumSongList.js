import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPause,
  faPlay,
  faVolumeDown,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

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



const CurrentTime = ({ currentTime, song }) => {
  return (
    <>
      {currentTime} / {song?.song?.length_formatted}
    </>
  );
};

function AlbumSongList({ songs }) {
  const audioRef = useRef();
  const rangeRef = useRef();
  const thumbRef = useRef();

  const [play, setPlay] = useState(false);
  const [currentTimeProgress, setcurrentTimeProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [currentSong, setCurrentSong] = useState({ id: "" });

  const [percentage, setPercentage] = useState(0)
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0)
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState();


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
      setPlay(true)
      setcurrentTimeProgress(0)
      audioRef.current.pause()
      setCurrentSong(song);
      audioRef.current.src = song.song.url;
      audioRef.current.play()
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


  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
  
    setPercentage(e.target.value)
    
  }

  const getCurrentDuration = (e) => {
    const percent =((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
    
  }

  useEffect(( ) => {
    const rangeWidth =  rangeRef.current? rangeRef.current.getBoundingClientRect().width : null
    const thumbWidth = thumbRef.current?  thumbRef.current.getBoundingClientRect().width : null
    
    // const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setMarginLeft(centerThumb);
    setPosition(percentage.toString());
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);


// const ProgressSong = ({ currentTimeProgress }) => {
//   return (
//     <>
//       <div className="ccurrent-time progress-bar-cover"
//       style={{
//           width: `${currentTimeProgress}%`}}></div>
//        <div
//             className="thumb"
//             ref={thumbRef}
//             // style={{
//             //   left: `${position}%`,
//             //   marginLeft: `${marginLeft}px`,
//             // }}
//           ></div> 
      
//       {/* <div className="current-time progress"></div> */}
//     </>
//   );
// };



console.log(progressBarWidth)

  return (
    <div className="container mt-4">
      <audio 
      ref={audioRef} 
      onEnded={()=>nextSong()} 
      // onTimeUpdate={updateTime}
      onLoadedData={(e) => {
        setDuration(e.currentTarget.duration.toFixed(2))
      }}
      onTimeUpdate={getCurrentDuration}
      
      >
        
      </audio>
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


          <div className="d-none d-md-flex align-items-center justify-content-center ">
            {currentSong.id === song.id ? (
             <>
             <div className="slider-container">
              <div className=" progress-bar-cover"
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
          </div>


          <div className="custom-volumen-icon d-none d-md-block">
            {currentSong.id === song.id ? (
              <MutedButton muted={muted} playMuted={playMuted} />
            ) : null}
          </div>
          <div className="custom-play-duration ">
            {song?.song?.length_formatted}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AlbumSongList;
