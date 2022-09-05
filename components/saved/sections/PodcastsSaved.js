import React from 'react'
import CardAudio from '@components/creator/cards/CardAudio'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

function PodcastsSaved({ audios, podcastIds }) {
  if (audios && audios.audios && audios.audios.length === 0) {
    return ''
  }

  if (podcastIds && podcastIds.length === 0) {
    return ''
  }

  return (
    <div className="row mb-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">PODCASTS</h4>
      </div>
      {!audios && <SpinnerLoader />}
      {!podcastIds && podcastIds && podcastIds.length > 0 && <SpinnerLoader />}
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardAudio audio={audio} />
          </div>
        ))}
    </div>
  )
}

export default PodcastsSaved
