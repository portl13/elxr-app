import React from 'react';

import ControllerIcon from '../assets/icons/ControllerIcon';
import HeartFullIcon from '../assets/icons/HeartFullIcon';
import LiveIcon from '../assets/icons/LiveIcon';
import PeopleIcon from '../assets/icons/PeopleIcon';
import SubscribeFullIcon from '../assets/icons/SubscribeFullIcon';
import WatcherIcon from '../assets/icons/WatcherIcon';
import { videoEventHeaderCss } from './VideoEventStyle';

export default function VideoEventHeader(props) {

  const {
    eventName,
    speaker
  } = props

  return (
    <header
      // className={`${props.showMembers ? 'show-members' : ''} ${
      //   props.isFullScreen ? 'full-screen' : ''
      // }`}
      css={videoEventHeaderCss}
    >
      <div className="stream-details">
        <LiveIcon />
        <div className="info">
          <h2 className="stream-title stream-info-layout">
            {eventName}
          </h2>
          <div className="info-separator">
            <div className="info-separator-item">
              <ControllerIcon />
              <p className="stream-info-layout">{speaker}</p>
            </div>
          </div>
        </div>
      </div>
      {
        <div className="stream-involvement">
          <div className={`watchers-container stream-involvement-item`}>
            <WatcherIcon />
            <p className="title-text">458K</p>
          </div>
          <div className={`follows-container stream-involvement-item`}>
            <HeartFullIcon />
            <p className="title-text">1.2K</p>
          </div>
          <div className={`subs-container stream-involvement-item last`}>
            <SubscribeFullIcon />
            <p className="title-text">250</p>
          </div>
        </div>
      }
    </header>
  );
}
