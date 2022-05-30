import React, { useEffect, useState } from 'react'
import { v4 as uuidv5 } from 'uuid';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout'
import ChannelWidget from '../../components/channels/ChannelWidget';
import { useChannel } from '../../hooks/useChannel';
import transformXprofileData from '../../helpers/transformXprofileData';
import ShowMoreText from '../../components/ui/ShowMoreText';
import ChannelSocialList from '../../components/channels/ChannelSocialList';
import ChannelMetaVideo from '../../components/channels/ChannelMetaVideo';
import useLoadMore from '../../hooks/useLoadMore';
import LiveFeedCard from '../../components/livefeed/LiveFeedCard';
import { CommunityCardLivefeedStyle } from '../../components/livefeed/livefeed.style';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';


const CardSkeletonCommunity = () => {

    return (
        <>
            <div css={CommunityCardLivefeedStyle} >
                <SkeletonTheme color="#1e2331" highlightColor="#444">
                    <p>
                        <Skeleton height={30} />
                    </p>
                    <p>
                        <Skeleton height={200} />
                    </p>
                </SkeletonTheme>
            </div>
        </>)
}

export default function ChannelPageDetail() {

    const url = process.env.bossApi + '/activity/'

    const router = useRouter();

    const { query } = router;

    const name = !query?.name ? null : query.name

    const [data, setData] = useState(null)

    const [isLive, setIsLive] = useState(false)

    const cardLoading = [...Array(10).keys()]

    const { channel } = useChannel(name);

    useEffect(() => {
        if (channel) {
            setData(transformXprofileData(channel, 8));
            setData(pre => ({
                ...pre,
                ...channel
            }))
        }

    }, [channel])

    const ChannelPublisher = (streamName) => {
        var config = {
            rtcport: '',
            rtmpport: '',
            host: 'stream.portl.live'
        };
        var rtcConfig = Object.assign({}, config, {
            protocol: 'wss',
            port: config.rtcport,
            streamName: streamName
        })
        var rtmpConfig = Object.assign({}, config, {
            protocol: 'rtmp',
            port: config.rtmpport,
            streamName: streamName,
            mediaConstraints: {
                video: {
                    width: {
                        ideal: 1920
                    },
                    height: {
                        ideal: 1080
                    },
                    frameRate: {
                        ideal: 60
                    }
                },
                audio: true
            },
            swf: 'https://stream.portl.live/lib/red5pro/red5pro-subscriber.swf',
            swfobjectURL: 'https://stream.portl.live/lib/swfobject/swfobject.js',
            productInstallURL: 'https://stream.portl.live/lib/swfobject/playerProductInstall.swf'
        })

        var publisher = new red5prosdk.Red5ProPublisher();

        publisher.setPublishOrder(['rtc', 'rtmp'])
            .init({
                rtc: rtcConfig,
                rtmp: rtmpConfig
            })
            .then(function (selectedPublisher) {
                return selectedPublisher.publish();
            })
            .then(function () {
                console.log('Successfully started a broadcast session!');
            })
            .catch(function (error) {
                console.error('Could not start a broadcast session: ' + error);
            })
    }

    const goLive = () => {
        setIsLive(true);

    }

    const {
        result,
        isLoadingInitialData,
    } = useLoadMore({
        url,
        page_limit: 20,
        wait: data,
        fectcher: (url, { id }) => fetch(`${url}&user_id=${id}`, { method: 'GET' }).then(resp => resp.json()),
    });

    useEffect(() => {
        if (isLive) {
            ChannelPublisher()
        }
        return () => { }
    }, [isLive])

    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-8">
                        <div className="ratio ratio-16x9">

                        </div>
                        {data ? <ChannelMetaVideo data={data} /> : ''}
                    </div>
                    <div className="col-4">
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <ChannelWidget title="About" >
                            <div className="widget-about">
                                <div className="widget-about__img">
                                    <div className="ratio ratio-4x3">
                                        {data?.channel_image?.raw ?
                                            <img src={data?.channel_image?.raw} alt="s" />
                                            : ''
                                        }
                                    </div>
                                </div>
                                <div>
                                    {data?.channel_social_networks?.unserialized
                                        ? <ChannelSocialList networks={data?.channel_social_networks?.unserialized} />
                                        : ''}
                                </div>
                            </div>

                            {data?.channel_description?.rendered ? <ShowMoreText
                                text={data?.channel_description.rendered}
                                line={100}
                            /> : ''}
                        </ChannelWidget>
                        <ChannelWidget title="Schedule" ></ChannelWidget>
                        <ChannelWidget title="FAQ" >
                            {data?.channel_faq?.rendered ? <span dangerouslySetInnerHTML={{ __html: data?.channel_faq?.rendered }} /> : ''}
                        </ChannelWidget>
                        <ChannelWidget title="Rules" >
                            {data?.channel_rules?.raw ? <span dangerouslySetInnerHTML={{ __html: data?.channel_rules?.raw }} /> : ''}
                        </ChannelWidget>
                        <ChannelWidget title="Sponsors" >

                        </ChannelWidget>
                        <ChannelWidget title="Contact" >
                            {data?.channel_contact?.rendered ? <span dangerouslySetInnerHTML={{ __html: data?.channel_contact?.rendered }} /> : ''}
                        </ChannelWidget>
                    </div>
                    <div className="col-6">
                        <ChannelWidget title="Activity" >

                            {isLoadingInitialData && cardLoading.map(load => <CardSkeletonCommunity key={`${load} - ${uuidv5()}`} />)}

                            {result.map(act => (
                                <LiveFeedCard 
                                key={`${act.id} - ${uuidv5()}`}
                                 activity={act}                                 
                                activityList={result}
                                setActivityList={setResult}
                                showProfileGroup={true} />
                            ))}

                            {result.length === 0 && <h3 className="text-center">No Activity</h3>}
                        </ChannelWidget>
                    </div>
                    <div className="col-3">
                        <ChannelWidget title="Photos" ></ChannelWidget>
                        <ChannelWidget title="Videos" ></ChannelWidget>
                        <ChannelWidget title="Audio" ></ChannelWidget>
                        <ChannelWidget title="Files" ></ChannelWidget>
                        <ChannelWidget title="Merchandise" ></ChannelWidget>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
