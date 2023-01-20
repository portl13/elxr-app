import React from "react";
import {
  faFacebookSquare,
  faInstagramSquare,
  faSnapchatSquare,
  faTiktok,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TikTokIcon from "@icons/TikTokIcon";
import FacebookIcon from "@icons/FacebookIcon";
import TwitterIcon from "@icons/TwitterIcon";
import YoutubeIcon from "@icons/YoutubeIcon";
import InstagramIcon from "@icons/InstagramIcon";
import SnapchatIcon from "@icons/SnapchatIcon";

function CreatorSocialList({ social }) {
  const socialIcons = {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    youtube: <YoutubeIcon />,
    instagram: <InstagramIcon />,
    snapchat: <SnapchatIcon />,
    tiktok: <TikTokIcon />,
  };

  return (
    <ul className="social-list my-0">
      {social.map((social) => (
        <React.Fragment key={social.name}>
          {social?.url !== "" ? (
            <li className={"social-list-item"} >
              <a href={social.url} target="_blank">
                <i className="social-icon">{socialIcons[social.name]}</i>
              </a>
            </li>
          ) : null}
        </React.Fragment>
      ))}
    </ul>
  );
}

export default CreatorSocialList;
