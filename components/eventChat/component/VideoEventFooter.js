import React, { useState } from 'react'

import AlarmIcon from '../assets/icons/AlarmIcon';
import CheckIcon from '../assets/icons/CheckIcon';
import ClockIcon from '../assets/icons/ClockIcon';
import DownVoteIcon from '../assets/icons/DownVoteIcon';
import HeartFullIcon from '../assets/icons/HeartFullIcon';
import HeartHollowIcon from '../assets/icons/HeartHollowIcon';
import SubscribeFullIcon from '../assets/icons/SubscribeFullIcon';
import SubscribeHollowIcon from '../assets/icons/SubscribeHollowIcon';
import UpVoteIcon from '../assets/icons/UpVoteIcon';
import { videoEventFooterCss } from './VideoEventStyle';

export default function VideoEventFooter(props) {

  const { 
    channelName,
    categoryChannel
  } = props;

    const [followed, setFollowed] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    return (
        <footer css={videoEventFooterCss}>
          <div className='streamer-details-container'>
            <div className='avatar'></div>
            <div className='streamer-container'>
              <div className='streamer-name'>
                <p>{channelName}</p>
                <CheckIcon />
              </div>
              <ul className='streamer-details'>
                {categoryChannel.map((cat, index) => (
                  <li key={index}>{cat}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* {window.innerWidth > 920 && ( */}
            <div className='user-interaction-container'>
              {/* <div className='timer-container'>
                <div>
                  <p>{countDown}</p>
                  <ClockIcon />
                </div>
                <div>
                  <p>-{countUp}</p>
                  <AlarmIcon />
                </div>
              </div> */}
              <button
                className={`follow-btn btn`}
                onClick={() => setFollowed(!followed)}
              >
                  {followed ? <HeartFullIcon /> : <HeartHollowIcon />}
                  <span>Follow</span>
              </button>
              <button
                className={`sub-btn btn`}
                onClick={() => setSubscribed(!subscribed)}
              >
                  {subscribed ? <SubscribeFullIcon /> : <SubscribeHollowIcon />}
                  <span>Subscribe</span>
              </button>
              {/* {window.innerWidth > 1100 && ( */}
                <div className='btn-group'>
                  <button className="btn">
                      <UpVoteIcon />
                      <span>325K</span>
                  </button>
                  <button className="btn">
                      <DownVoteIcon />
                      <span>9.5K</span>
                  </button>
                </div>
               {/* )} */}
            </div>
          {/* )} */}
        </footer>
      );
}
