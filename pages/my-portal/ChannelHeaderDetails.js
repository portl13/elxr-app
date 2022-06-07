import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedin,
  faSnapchat,
  faTwitter,
  faYoutube,
  faTwitch,
  faFacebook,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';

function ChannelHeaderDetails({ channelHeaderDetail }) {
  const twitter = channelHeaderDetail?.social.map((d) => d.url)[0];
  const facebook = channelHeaderDetail?.social.map((d) => d.url)[1];
  const youtube = channelHeaderDetail?.social.map((d) => d.url)[2];
  const instagram = channelHeaderDetail?.social.map((d) => d.url)[3];
  const linkedin = channelHeaderDetail?.social.map((d) => d.url)[4];
  const tikTok = channelHeaderDetail?.social.map((d) => d.url)[5];
  const snapchat = channelHeaderDetail?.social.map((d) => d.url)[6];
  const twitch = channelHeaderDetail?.social.map((d) => d.url)[7];



  return (
    <>
      <div className="header-cover-image">
        <img className="header-cover-img" src={channelHeaderDetail?.vendor_list_banner} />
        <div className="follow-button">
          <FontAwesomeIcon icon={faUserPlus} />
          Following
        </div>
      </div>
      <div className="item-header-cover-image">
        <div className="item-header-avatar"><img className="header-cover-img" src={channelHeaderDetail?.vendor_shop_logo} /></div>
        <div className="connection-detail-section">
          <h2 className="group-title d-flex justify-content-center justify-content-lg-start align-items-center">{channelHeaderDetail?.vendor_shop_name}</h2>
          <div className="social-icons">
            <div className="give-tip-tag">
              <span className="text-tag">GIVE TIP</span>
              <input type="" />
              <em>$</em>
              <span className="up-icon"><FontAwesomeIcon icon={faUpload} /></span>
            </div>
            <ul>
              {channelHeaderDetail?.social[0].url !== '' &&
                <li>
                  <a href={twitter} target="_blank">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </li>
              }
              {channelHeaderDetail?.social[1].url !== '' &&
                <li>
                  <a href={facebook} target="_blank">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                </li>
              }
              {channelHeaderDetail?.social[3].url !== '' &&
                <li>
                  <a href={instagram} target="_blank">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a></li>
              }
              {channelHeaderDetail?.social[2].url !== '' &&
                <li>
                  <a href={youtube} target="_blank">
                    <FontAwesomeIcon icon={faYoutube} />
                  </a></li>
              }
              {channelHeaderDetail?.social[4].url !== '' &&
                <li>
                  <a href={linkedin} target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a></li>
              }
              {channelHeaderDetail?.social[5].url !== '' &&
                <li>
                  <a href={tikTok} target="_blank">
                    <FontAwesomeIcon icon={faTiktok} />
                  </a></li>
              }
              {channelHeaderDetail?.social[6].url !== '' &&
                <li>
                  <a href={snapchat} target="_blank">
                    <FontAwesomeIcon icon={faSnapchat} />
                  </a></li>
              }
              {channelHeaderDetail?.social[7].url !== '' &&
                <li>
                  <a href={twitch} target="_blank">
                    <FontAwesomeIcon icon={faTwitch} />
                  </a></li>
              }
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default ChannelHeaderDetails;