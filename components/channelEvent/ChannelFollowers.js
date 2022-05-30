import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/core'

const channelFollowerCard = css`
    .avatar{
        width:130px;
        height:130px;
        margin: auto;
    }
    .card-title{
        font-size: 20px;
        font-weight: 500;
        line-height: 1.2;
    }
`

const ChannelFollowerCard = ({follower}) => {
    return (
        <article css={channelFollowerCard} className="card mb-5">
            <img 
                src={follower?.avatar} 
                className="card-img-top rounded-circle avatar" 
                alt={follower?.display_name} 
            />
            <div className="card-body p-0 text-center mt-4">
                <h5 className="card-title">{follower?.display_name}</h5>
            </div>
        </article>
    )
}

const ChannelFollowers = ({data}) => {
    return (
        <div className="row">
            {data?.data && data?.data.map(follower=>(
                <div key={follower.ID} className="col-12 col-md-6 col-lg-4">
                    <Link href={`/profile/${follower?.display_name}/${follower?.ID}?key=profile`}>
                        <a>
                            <ChannelFollowerCard follower={follower} />
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default ChannelFollowers
