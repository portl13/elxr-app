import React from 'react'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import Link from 'next/link'

function ChannelCard({ channel }) {
  return (
    <div className="card-general ">
      <div
        style={{
          backgroundImage: `url(${channel?.channel_cover?.medium})`,
        }}
        className="ratio ratio-16x9 bg-gray card-head cover-bg"
      ></div>
      <div className="card-info">
        <div className="avatar-contain d-flex justify-content-between">
          <div className="card-avatar bg-gray">
            {channel.channel_logo && <img src={channel.channel_logo} />}
          </div>
        </div>
        <div>
          <h3 className="card-title">
            <Link href={`/channel/${channel?.id}`}>
              <a className="text-white text-ellipsis">{channel.channel_name}</a>
            </Link>
          </h3>
          <span className="card-date-creacion">
            Created on {getFormatedDateFromDate(channel.date, 'MMM dd, yyyy')}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChannelCard
