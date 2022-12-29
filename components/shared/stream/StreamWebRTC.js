import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faMicrophoneSlash,
    faStop,
    faVideo, faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import {WHIPClient} from "@eyevinn/whip-web-client";

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

function StreamWebRtc({ stream }) {
  const videoPreview = useRef(null);
  const streamRef = useRef(null);
  const client = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [muted, setMuted] = useState(true);
  const [video, setVideo] = useState(true);

  const showCamera = () => {
    streamRef.current.getVideoTracks().forEach((track) => {
      const enabled = !track.enabled;
      setVideo(enabled);
      track.enabled = enabled;
    });
  };

  const startStream = () => {
      client.current = new WHIPClient({
          endpoint: `${stream.webRTC.url}`,
          opts: { debug: true, iceServers: [{ urls: "stun:stun.cloudflare.com:3478" }] }
      });

      client.current.ingest(streamRef.current)
      setIsActive(true)
  };

  const stopStream = () => {
      client.current.destroy()
      setIsActive(false)
      getLocalVideo().then()
  };

  const showMuted = () => {
    streamRef.current.getAudioTracks().forEach((track) => {
      const enabled = !track.enabled;
      setMuted(enabled);
      track.enabled = enabled;
    });
  };

  const getLocalVideo = async () => {
    videoPreview.current.volume = 0;

    streamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    videoPreview.current.srcObject = streamRef.current;

    videoPreview.current.play();
  };

  useEffect(() => {
    getLocalVideo().then();
  }, []);

  return (
    <div css={styleLivePage} className={`ratio ratio-16x9`}>
      <video ref={videoPreview}></video>
      <div className="video-control d-flex justify-content-center">
        <div>
          <button onClick={() => showCamera()} className="btn btn-icon mr-2">
            {!video && (
              <FontAwesomeIcon
                className="video-control-icon text-white"
                icon={faVideoSlash}
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
              onClick={startStream}
              className="btn ml-2 btn-primary b-radius-25"
            >
              Go Live
            </button>
          )}
          {isActive && (
            <button
              onClick={() => stopStream()}
              className="btn  btn-icon ml-2 bg-danger"
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

export default StreamWebRtc;
