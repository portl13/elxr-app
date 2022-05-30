import React from 'react'
import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faSpotify,
    faTwitch,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons'

import useIcon from '../../hooks/useIcon';
import { css } from '@emotion/core';
import ChannelSocialIcon from './ChannelSocialIcon';

function ChannelSocialList( { networks } ) {

    const { iconElement: facebook  } = useIcon(faFacebookF)
    const { iconElement: instagram } = useIcon(faInstagram)
    const { iconElement: twitter   } = useIcon(faTwitter)
    const { iconElement: youtube   } = useIcon(faYoutube)
    const { iconElement: twitch    } = useIcon(faTwitch)
    const { iconElement: spotify   } = useIcon(faSpotify)
    const { iconElement: linkedin  } = useIcon(faLinkedin)


    return (
        <ul
        className="d-flex flex-wrap justify-content-center justify-content-lg-start"
        css={css`
            list-style: none;
            padding: 0;
            margin-top: 20px;
            li{
                margin-right:15px;
                margin-left:5px;
                margin-bottom: 15px;
            }
        `}
        >
            { networks?.youTube && (<li>
                <ChannelSocialIcon 
                
                icon={ youtube }
                link={ networks?.youTube }

                />
            </li>) }

            { networks?.facebook && (<li>
                <ChannelSocialIcon 
                
                icon={ facebook }
                link={ networks?.facebook }

                />
            </li>) }

            { networks?.instagram && (<li>
                <ChannelSocialIcon 
                
                icon={ instagram }
                link={ networks?.instagram }

                />
            </li>) }

            { networks?.linkedIn && (<li>
                <ChannelSocialIcon 
                
                icon={ linkedin }
                link={ networks?.linkedIn }

                />
            </li>) }

            { networks?.twitter && (<li>
                <ChannelSocialIcon 
                
                icon={ twitter }
                link={ networks?.twitter }

                />
            </li>) }

        </ul>
    )
}

export default ChannelSocialList