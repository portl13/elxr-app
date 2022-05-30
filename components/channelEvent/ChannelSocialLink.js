import React, { useState, useEffect }  from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { css } from '@emotion/core'

import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faSpotify,
  faTwitch,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'




const ChannelStyleSocialLinks = css`
    margin-bottom: 0;
    list-style: none;
    display: flex;
    padding: 0 30px;
    align-items: center;
    justify-content: center;
    height: 60px;

  .channel-header-social-item {
    background-color: #fff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 6px;
    margin-left: 6px;
  }
  .channel-header-icon {
    height: 16px;
    color: #646464;
  }
`



const ChannelSocialLink = (props) => {
    
    const { channel } = props

    const socialIcon = {
      facebook: faFacebookF,
      twitter: faTwitter,
      linkedin: faLinkedin,
      instagram: faInstagram,
      youtube: faYoutube,
      spotify: faSpotify,
      twitch: faTwitch,
    }
  
    const [social, setSocial] = useState([])
  
    useEffect(() => {
      if(!channel || !channel?.social) return;
      const socialLinks = [];
      for (let i = 0; i < channel?.social.length; i++) {
        const element = channel?.social[i];
        if (element.name in socialIcon) {
          element['icon'] = socialIcon[element.name]
          socialLinks.push(element);
        }
      }
      setSocial(socialLinks)
    }, [channel])

    return (
        <ul css={ChannelStyleSocialLinks} className="channel-header-social">
          {social.length > 0 && social.map((social) => (
            <li key={social.name} className="channel-header-social-item">
              <a href={social.url}>
                <FontAwesomeIcon
                  className="channel-header-icon"
                  icon={social.icon}
                />
              </a>
            </li>
          ))}
        </ul>
    )
}

export default ChannelSocialLink
