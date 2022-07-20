import ChannelCard from '@components/creator/cards/ChannelCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'


const channelUrl = `${process.env.apiV2}/channels?all=true`


function SectionChannels() {


    const { data: channels, error } = useSWR(
        `${channelUrl}&page=1&per_page=4`,
        getFetchPublic
      )
    const isLoading = !channels && !error

  return (
    <>
        <div className="row mt-5">
            <div className="col-12">
                <h4 className='font-size-14'>CHANNELS</h4>
            </div>
        {isLoading && <SpinnerLoader />}
        {channels &&
          channels.channels &&
          channels.channels.map((channel) => (
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
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

export default SectionChannels