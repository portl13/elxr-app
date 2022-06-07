import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

function ChannelMedia() {
  return (
    <>
      <div className="video-streaming-container">
        <div className="video-streaming-panel">Go Live Coming Soon</div>
        <div className="chat-panel">
          <div className="follow-panel">
            <button className="subscribe-button">Subcribe</button>
          </div>
          <div className="chat-section">Chat Box Coming Soon</div>
        </div>
      </div>
    </>
  );
}

export default ChannelMedia;