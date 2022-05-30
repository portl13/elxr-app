import React, { useState } from "react";
import { SectionChannel } from "../ui/section/SectionChannel";
import PrimaryButton from '../ui/button/PrimaryButton';
import SecondaryButton from '../ui/button/SecondaryButton';
import TruncateMarkup from 'react-truncate-markup';
import ChannelSocialList from "./ChannelSocialList";

const readMoreEllipsis = (show, setShow) => (
    <span>
        <span onClick={() => setShow(!show)} style={{
            color: '#e0116d',
            marginLeft: '5px',
            cursor: 'pointer'
        }} >
            ...read more
        </span>
    </span>
);

const ChannelDetail = ({ channel }) => {

    const baseUrl = process.env.baseUrl + '/wp-content/uploads/';

    const [show, setShow] = useState(false)

    const {
        channel_not_live_image,
        channel_name,
        channel_image,
        channel_description,
        social_networks
    } = channel;

    return (
        <SectionChannel>
            <header className="channel-header">
                <figure className="ratio ratio-16x9 b-radius-top">

                    {channel_not_live_image?.raw && <img
                        className="img-ration"
                        src={channel_not_live_image?.raw}
                        alt="events" />}
                </figure>
                <div className="event-meta row">
                    <div className="col-12 col-lg-7">
                        <h1 className="channel-title text-center text-lg-left">{
                            channel_name?.raw ?
                                channel_name?.raw :
                                "Channel not name"
                        }</h1>
                        {social_networks?.unserialized && <ChannelSocialList networks={social_networks?.unserialized} />}
                    </div>
                    <div className="col-12 col-lg-5">
                        <span className="channel-action text-center text-lg-right">
                            <PrimaryButton value="follow" />
                            <SecondaryButton value='subscribe' />
                        </span>
                    </div>
                </div>

            </header>
            <footer className="channel-footer">

                <div className="channel-artist">

                    {channel_image?.raw && <img src={channel_image?.raw} alt={`channel image ${channel_name?.raw ?
                        channel_name?.raw :
                        "Channel not name"}`} className="channel-artist-img" />}

                </div>
                <div className="channel-description">
                    {!show ? (
                        <TruncateMarkup
                            lineHeight={190}
                            ellipsis={readMoreEllipsis(show, setShow)}
                        >
                            <div>
                                {channel_description?.raw ?
                                    channel_description?.raw :
                                    "not description"}
                            </div>
                        </TruncateMarkup>) : (
                        <>
                            <div dangerouslySetInnerHTML={{ __html: channel_description?.rendered ? channel_description?.rendered : '' }} />
                            <span>
                                <span onClick={() => setShow(!show)} style={{
                                    color: '#e0116d',
                                    marginLeft: '5px',
                                    cursor: 'pointer'
                                }} >
                                    less
                                </span>
                            </span>
                        </>
                    )}
                </div>
            </footer>
        </SectionChannel>
    );
}

export default ChannelDetail;
