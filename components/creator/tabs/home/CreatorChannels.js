import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import React from 'react'
import useSWR from 'swr'
import ChannelCard from '../../cards/ChannelCard'

const channelUrl = `${process.env.apiV2}/channels?author=`

function CreatorChannels({ creator_id }) {
  const { data: channels, error } = useSWR(
    `${channelUrl}${creator_id}&page=1&per_page=4`,
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
        {channels && channels.channels && channels.channels.length === 0 && (
          <h3 className="col display-4">
            You have not created any channel yet
          </h3>
        )}
      </div>
    </>
  )
}

export default CreatorChannels
