import React from 'react'
import {
  faFacebookSquare,
  faInstagramSquare,
  faSnapchatSquare,
  faTiktok,
  faTwitterSquare,
  faYoutubeSquare,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TikTokIcon from '@icons/TikTokIcon'

function CreatorSocialList({ social }) {
  const socialIcons = {
    facebook: <FontAwesomeIcon icon={faFacebookSquare} />,
    twitter: <FontAwesomeIcon icon={faTwitterSquare} />,
    youtube: <FontAwesomeIcon icon={faYoutubeSquare} />,
    instagram: <FontAwesomeIcon icon={faInstagramSquare} />,
    snapchat: <FontAwesomeIcon icon={faSnapchatSquare} />,
    tiktok: <TikTokIcon />,
  }

  return (
    <ul className="social-list">
      {social.map((social) => (
        <li className={ social.name === 'tiktok' ? 'social-list-item' : ''} key={social.name}>
          <a href={social.url} target="_blank">
            <i className="social-icon">{socialIcons[social.name]}</i>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default CreatorSocialList
