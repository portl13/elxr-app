import React from 'react'
import ChannelCard from '@components/creator/cards/ChannelCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import useSWR from 'swr'

const channelUrl = `${process.env.apiV2}/channels?channel_id=`

function CreatorChannels({ channel_id }) {
  const { data: channels, error } = useSWR(
    `${channelUrl}${channel_id}&page=1&per_page=4`,
    getCreator
  )
  const isLoading = !channels && !error
  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="font-size-14 mb-3">CHANNELS</h4>
        </div>
        {isLoading && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <div className="col-12 col-md-6 col-lg-3" key={channel.id}>
              <ChannelCard channel={channel} />
            </div>
          ))}
      </div>
    </>
  )
}

export default CreatorChannels
