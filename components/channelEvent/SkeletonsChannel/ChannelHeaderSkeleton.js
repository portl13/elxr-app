import React from 'react'
import { ChannelHeaderStyle } from '../ChannelHeader.style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faSpotify,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export default function ChannelHeaderSkeleton() {
  return (
    <SkeletonTheme color="#555" highlightColor="#5b5b5d">
      <ChannelHeaderStyle style={{backgroundColor:'#555'}}>
        <div className="channel-header">
          <div className="channel-header-title-avatar">
            <div className="channel-header-avatar-container">
              <div className="channel-header-avatar">
                  <Skeleton width={150} height={150} />
              </div>
            </div>
            <h1 className="channel-header-title">
                <Skeleton width={280} />
            </h1>
          </div>
          <ul className="channel-header-social">
 
          </ul>
        </div>
      </ChannelHeaderStyle>
    </SkeletonTheme>
  )
}
