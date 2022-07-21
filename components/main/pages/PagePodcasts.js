import CardAudio from '@components/creator/cards/CardAudio'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import React, { useState } from 'react'
import useSWR from 'swr'

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`
const tabs = [
  {
    tab: 'all',
    label: 'All',
  },
  {
    tab: 'art',
    label: 'Art',
  },
  {
    tab: 'food',
    label: 'Food',
  },
  {
    tab: 'music',
    label: 'Music',
  },
  {
    tab: 'yoga',
    label: 'Yoga',
  },
]

function PagePodcasts() {
  const [tab, setTab] = useState('')
  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=12`,
    getFetchPublic
  )
  const isLoading = !audios && !error

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Podcasts</h4>
        </div>
        <div className="col-12 col-md-6 mb-5">
          {tabs.map((item) => (
            <button
              key={item.tab}
              onClick={() => setTab(item.tab)}
              className={`${tab === item.tab ? 'active' : ''} custom-pills`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="col-12 col-md-6 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch />
          </div>
        </div>
        {isLoading && <SpinnerLoader />}
        {audios &&
          audios.audios &&
          audios.audios.length > 0 &&
          audios.audios.map((audio) => (
            <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CardAudio audio={audio} />
            </div>
          ))}
        {audios && audios.audios && audios.audios.length === 0 && (
          <h3 className="col display-4">
            You have not created any podcasts yet
          </h3>
        )}
      </div>
    </>
  )
}

export default PagePodcasts
