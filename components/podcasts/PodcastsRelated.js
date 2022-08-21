import CardAudio from '@components/creator/cards/CardAudio'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import React from 'react'
import useSWR from 'swr'

const url = `${process.env.apiV2}/podcasts`

function PodcastsRelated({ category }) {
  const { data } = useSWR(
    `${url}?category=${category}&page=1&per_page=3`,
    getFetchPublic
  )

  return (
    <aside>
      {!data && <SpinnerLoader />}
      {data &&
        data.audios.map((audio) => (
          <div className="mb-4" key={audio.id}>
            <CardAudio audio={audio} />
          </div>
        ))}
    </aside>
  )
}

export default PodcastsRelated
