import React from 'react'
import CardAudio from '@components/creator/cards/CardAudio'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'

function PodcastsSaved({ audios }) {
  return (
    <div className="row mb-4">
      <div className="col-12 d-flex justify-content-between mb-2">
        <h4 className="font-size-14">PODCASTS</h4>
      </div>
      {audios &&
        audios.audios &&
        audios.audios.length > 0 &&
        audios.audios.map((audio) => (
          <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
            <CardAudio audio={audio} />
          </div>
        ))}
      {!audios && <SpinnerLoader />}
    </div>
  )
}

export default PodcastsSaved
