import React from 'react'
import Link from 'next/link'
import { convertToUTC, getFormatedDateFromDate } from '@utils/dateFromat'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'
import { stringToSlug } from '@lib/stringToSlug'

function ChannelCard({ channel }) {
  return (
    <div className="card-general ">
      <Link href={`/channel/${stringToSlug(channel.channel_name)}/${channel?.id}`}>
        <a>
          <div
            style={{
              backgroundImage: `url(${channel?.channel_cover?.medium})`,
            }}
            className="ratio ratio-16x9 bg-gray card-head cover-bg"
          ></div>
        </a>
      </Link>

      <div className="card-info">
        <Link href={`/channel/${stringToSlug(channel.channel_name)}/${channel?.id}`}>
          <a>
            <div className="avatar-contain d-flex justify-content-between">
              <div className="card-avatar bg-gray">
                {channel.channel_logo && <img src={channel.channel_logo} />}
              </div>
            </div>
          </a>
        </Link>

        <div>
          <h3 className="card-title">
            <Link href={`/channel/${stringToSlug(channel.channel_name)}/${channel?.id}`}>
              <a className="text-white text-ellipsis">{channel.channel_name}</a>
            </Link>
          </h3>
          <span className="card-date-creacion">
            Created on {getFormatedDateFromDate(
              convertToUTC(channel.date)
              , 'MMM dd, yyyy')}
          </span>
          <CategoryAndTags 
            category={channel.category}
            tags={channel.tags}
          />
        </div>
      </div>
    </div>
  )
}

export default ChannelCard
