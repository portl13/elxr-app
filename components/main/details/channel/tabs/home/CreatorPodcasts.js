import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import useSWR from 'swr'
import CardAudio from '@components/creator/cards/CardAudio'

const podcastslUrl = `${process.env.apiV2}/podcasts?channel_id=`

function CreatorPodcasts({ channel_id }) {
  const { data: audios, error } = useSWR(
    `${podcastslUrl}${channel_id}&page=1&per_page=4`,
    getCreator
  )

  const isLoading = !audios && !error

  return (
    <div className="row mt-5">
      <div className="col-12">
        <h4 className="font-size-14 mb-3">PODCASTS</h4>
      </div>
      {isLoading && <SpinnerLoader />}
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-3">
            <CardAudio audio={audio} />
          </div>
        ))}
    </div>
  )
}

export default CreatorPodcasts
