import {
    faFacebookF,
    faInstagram,
    faLinkedin,
    faSpotify,
    faTwitch,
    faTwitter,
    faYoutube
} from '@fortawesome/free-brands-svg-icons'

import SocialAnchor from '../ui/anchors/SocialAnchor'

import useIcon from "../../hooks/useIcon"
import { css } from '@emotion/core'

const SocialList = ( { socialLinks = {} } ) => {

    const { iconElement: facebook  } = useIcon(faFacebookF)
    const { iconElement: instagram } = useIcon(faInstagram)
    const { iconElement: twitter   } = useIcon(faTwitter)
    const { iconElement: youtube   } = useIcon(faYoutube)
    const { iconElement: twitch    } = useIcon(faTwitch)
    const { iconElement: spotify   } = useIcon(faSpotify)
    const { iconElement: linkedin  } = useIcon(faLinkedin)


    const {
        xprofile : {
            groups
        }
    } = socialLinks;

    const { fields } = groups[6] || {};


    let twitterLink   
    let instagramLink 
    let facebookLink  
    let linkedinLink  
    let youtubeLink   
    let twitchLink    
    let spotifyLink   


    if(fields){
        twitterLink   = ( 55 in fields) ? fields[55]?.value?.raw  : null   
        instagramLink = ( 58 in fields) ? fields[58]?.value?.raw  : null 
        facebookLink  = ( 59 in fields) ? fields[59]?.value?.raw  : null 
        linkedinLink  = ( 60 in fields) ? fields[60]?.value?.raw  : null 
        youtubeLink   = ( 61 in fields) ? fields[61]?.value?.raw  : null   
        twitchLink    = ( 62 in fields) ? fields[62]?.value?.raw  : null    
        spotifyLink   = ( 63 in fields) ? fields[63]?.value?.raw  : null   
    }

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
            {!facebookLink ? '' : (
                <li key="facebook">
                    <SocialAnchor
                        icon={facebook}
                        link={facebookLink}
                    />
                </li>
            )}

            {!instagramLink ? '' : (
                <li key="instagram">
                    <SocialAnchor
                        icon={instagram}
                        link={instagramLink}
                    />
                </li>
            )}

            {!twitterLink ? '' : (
                <li key="twitter">
                    <SocialAnchor
                        icon={twitter}
                        link={twitterLink}
                    />
                </li>
            )}

            {!youtubeLink ? '' : (
                <li key="youtube">
                    <SocialAnchor
                        icon={youtube}
                        link={youtubeLink}
                    />
                </li>
            )}

            {!spotifyLink ? '' : (
                <li key="spotify">
                    <SocialAnchor
                        icon={spotify}
                        link={spotifyLink}
                    />
                </li>
            )}

            {!twitchLink ? '' : (
                <li key="twitch">
                    <SocialAnchor
                        icon={twitch}
                        link={twitchLink}
                    />
                </li>
            )}

            {!linkedinLink ? '' : (
                <li key="linkedin">
                    <SocialAnchor
                        icon={linkedin}
                        link={linkedinLink}
                    />
                </li>
            )}
        </ul>
    );
}

export default SocialList;