import moment from 'moment'
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { css } from '@emotion/core';

const LiveFeedGoingStyle = css`
    .livefeed-avatar{
        min-width: 50px;
        padding-left: 15px;
    }
    .livefeed-title{
        font-size: .98rem;
        margin: 0;
    }
    .livefeed-footer{
        padding-left: 15px;
        padding-right: 15px;
    }
    .image {
        display: block;
        position: relative;
        overflow: hidden;
        margin: 0;
        img{
            bottom: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
        }
    }
    .image.is-16by9 {
        padding-top: 56.25%;
    }
`

const LiveFeedGoing = ({ avatar, post }) => {

    const date = moment(post.date)

    const [event, setEvent] = useState(null)

    useEffect(() => {
        const getEvent = async () => {
            try {
                const { data } = await Axios.post('/api/events/id', {
                    "identifier": post.event_id
                })
                setEvent(data);
            } catch (error) {
                console.log(error);
            }

        }
        getEvent()
    }, []);

    if (event) return (
        <div css={LiveFeedGoingStyle} className="my-3">
            <div className="row">
                <div className="livefeed-avatar" >
                    <img src={avatar} alt="" className="avatar" />
                </div>
                <div className="col-9 d-flex align-items-center">
                    <b className="mr-1">You</b> are going
                </div>
            </div>

            <div className="row my-3">
                <div className="col-4 pr-0">
                    <figure className="image is-16by9">
                        {event.imageUrl && <img src={event.imageUrl} alt={event.title} />}
                    </figure>
                </div>
                <div className="col-8">
                    <h4 className="livefeed-title">{event.title}</h4>
                    <span className="livefeed-date">{post.startDateTime ? moment(post.startDateTime).calendar() : ''}</span>
                </div>
            </div>

            <div className="row livefeed-footer">
                <b>{date.format('MMM , YYYY [at] h:mm')}</b>
            </div>
        </div>
    )

    if (!event) return <h4>Loding...</h4>
}

export default LiveFeedGoing;
