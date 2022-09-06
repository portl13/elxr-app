import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

import React from 'react'
import ChannelCard from '../../cards/ChannelCard'



function CreatorChannels({ channels, isLoading }) {

  if (channels && channels.channels && channels.channels.length === 0) {
    return ''
  }

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
            <div className="col-12 col-md-6 col-lg-3 mb-4" key={channel.id}>
              <ChannelCard channel={channel} />
            </div>
          ))}
      </div>
    </>
  )
}

export default CreatorChannels
