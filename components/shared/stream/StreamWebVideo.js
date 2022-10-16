import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/core";
import {
  faMicrophone,
  faMicrophoneSlash,
  faStop,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Client } from "@livepeer/webrtmp-sdk";
import WHIPClient from "@utils/WHIPClient";

const styleLivePage = css`
  .live-page {
    padding-top: 100px;
  }
  .video-control {
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: unset;
    padding: 20px 0;
  }
  .video-control-icon {
    width: 15px;
    height: 15px;
  }
  .btn-icon {
    width: 40px;
    height: 40px;
    padding: 0;
    border-radius: 50%;
    background-color: #303236;
  }
`;

function StreamWebVideo({ stream_key = "",  WHIPData }) {
  const videoPreview = useRef(null);
  const stream = useRef(null);
  const session = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [muted, setMuted] = useState(true);
  const [video, setVideo] = useState(true);
  const [streamKey, setStreamKey] = useState("");
  const [webRtcUrl, setWebRtcUrl] = useState();

  const getLocalVideo = async () => {
    videoPreview.current.volume = 0;

    stream.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoPreview.current.srcObject = stream.current;

    videoPreview.current.play();
  };

  const startStream = async () => {
    console.log('entre')
    if (!streamKey) {
      return;
    }

    if (!stream.current) {
      await getLocalVideo();
    }

    const client = new Client({
      baseUrl: 'localhost:7867/webrtmp',
      secure: false,
    });

    session.current = client.cast(stream.current, streamKey);

    session.current.on("open", () => {
      setIsActive(true);
    });

    session.current.on("close", () => {
      setIsActive(false);
    });

    session.current.on("error", (err) => {
      console.log(err);
    });
  };

  const startStreamWhip = ()=>{
    session.current = new WHIPClient(webRtcUrl, videoPreview.current);
    setIsActive(true)
  }

  const stopCameraAndMic = () => {
    try {
      stream.current.getTracks().forEach((track) => track.stop());
      stream.current = null;
    } catch (e) {
      console.log(e);
    }
  };

  const showCamera = () => {
    try {
      stream.current.getVideoTracks().forEach((track) => {
        const enabled = !track.enabled;
        setVideo(enabled);
        track.enabled = enabled;
      });
    }catch (e) {
      console.log(e)
    }
  };

  const showMuted = () => {
    try {
      stream.current.getAudioTracks().forEach((track) => {
        const enabled = !track.enabled;
        setMuted(enabled);
        track.enabled = enabled;
      });
    }catch (e) {

    }
  };

  const stopStream = async () => {
    //await session.current.close();
    await session.current.disconnectStream();
    setIsActive(false)
  };

  useEffect(() => {
    //getLocalVideo();
  }, []);

  useEffect(() => {
    return () => stopCameraAndMic();
  }, []);

  useEffect(() => {
    if (stream_key) {
      setStreamKey(stream_key);
    }
  }, [stream_key]);

  useEffect(()=>{
    if (WHIPData){
      setWebRtcUrl(WHIPData.webRTC.url)
    }
  },[WHIPData])

  return (
    <div css={styleLivePage} className={`ratio ratio-16x9`}>
      <video ref={videoPreview}></video>
      <div className="video-control d-flex justify-content-center">
        <div>
          <button onClick={() => showCamera()} className="btn btn-icon mr-2">
            {!video && (
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faVideo}
              />
            )}
            {video && (
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faVideo}
              />
            )}
          </button>

          {!isActive && (
            <button
              onClick={startStreamWhip}
              className="btn ml-2 btn-primary b-radius-25"
            >
              Go Live
            </button>
          )}
          {isActive && (
            <button
              onClick={() => stopStream()}
              className="btn ml-2 btn-primary b-radius-25"
            >
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faStop}
              />
            </button>
          )}

          <button onClick={() => showMuted()} className="btn  btn-icon ml-2">
            {!muted && (
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faMicrophone}
              />
            )}

            {muted && (
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faMicrophoneSlash}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StreamWebVideo;
