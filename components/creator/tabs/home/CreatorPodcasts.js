import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getCreator } from '@request/creator'
import useSWR from 'swr'
import CardAudio from '../../cards/CardAudio'

const podcastslUrl = `${process.env.apiV2}/podcasts?author=`

function CreatorPodcasts({ creator_id }) {
  const { data: audios, error } = useSWR(
    `${podcastslUrl}${creator_id}&page=1&per_page=4`,
    getCreator
  )

  const isLoading = !audios && !error

  if (audios && audios.audios && audios.audios.length === 0) {
    return '';
  }

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
      {/* {audios && audios.audios && audios.audios.length === 0 && (
        <h3 className="col display-4">You have not created any podcasts yet</h3>
      )} */}
    </div>
  )
}

export default CreatorPodcasts
