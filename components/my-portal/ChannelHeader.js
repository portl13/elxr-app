import React from 'react'
import Link from 'next/link'
import { stringToSlug } from '../../lib/stringToSlug'
function ChannelHeader({ channelDetail, profileDetail, handleRedirect }) {
  return (
    <>
      <div className="main-head-conatiner">
        <div className="left-panel">
          <div className="wcfm-menu-logo">
            <h4>
              {channelDetail && (
                <Link
                  href={`/channel/${stringToSlug(
                    channelDetail?.vendor_shop_name
                  )}/${channelDetail?.vendor_id}`}
                >
                  <a target="_blank" className="avatar-icon">
                    <img
                      src={channelDetail?.vendor_shop_logo}
                      alt="image-tag"
                    />
                    <span>Visit My Channel</span>
                  </a>
                </Link>
              )}
            </h4>
          </div>
        </div>
        <div className="right-panel">
          <div className="wcfm-page-headig">
            <div className="right-section">
              {/* <div className="notification-ring">
                <FontAwesomeIcon icon={faBell} />
                <span className="count">10</span>
              </div> */}
              <div
                className="avatar-image"
                onClick={() => handleRedirect('social', 'personal')}
              >
                <img
                  src={
                    profileDetail?.user_avatar !== ''
                      ? profileDetail?.user_avatar
                      : 'https://data.portl.live/wp-content/plugins/wc-frontend-manager/assets/images/user.png'
                  }
                  alt="image"
                />
                <div className="tooltip-panel">
                  <em></em>Profile
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ChannelHeader
