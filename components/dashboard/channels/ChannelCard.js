import React, { useState } from 'react'
import { getFormatedDateFromDate } from '@utils/dateFromat'
import Link from 'next/link'
import ChannelActions from './ChannelActions'
import ChannelModalDelete from './ChannelModalDelete'
import CategoryAndTags from '@components/shared/cards/CategoryAndTags'

function ChannelCard({ channel, mutateChannels }) {
  console.log(
    '🚀 ~ file: ChannelCard.js ~ line 8 ~ ChannelCard ~ channel',
    channel
  )

  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="col-12 col-md-6 col-lg-3 mb-4">
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
              <ChannelActions
                channel={channel}
                openDeleteModal={open}
                setOpenDeleteModal={setOpen}
              />
            </div>
            <div>
              <h3 className="card-title">
                <Link href={`/dashboard/channel/${channel?.id}`}>
                  <a className="text-white text-ellipsis">
                    {channel.channel_name}
                  </a>
                </Link>
              </h3>
              <span className="card-date-creacion">
                Created on{' '}
                {getFormatedDateFromDate(channel.date, 'MMM dd, yyyy')}
              </span>
              <CategoryAndTags
                tags={channel.tags}
                category={channel.category}
              />
            </div>
          </div>
        </div>
      </div>
      <ChannelModalDelete
        mutateChannels={mutateChannels}
        open={open}
        setOpen={setOpen}
        channel={channel}
      />
    </>
  )
}

export default ChannelCard
