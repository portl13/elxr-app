import VideoCard from '@components/creator/cards/VideoCard'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ScrollTags from '@components/shared/slider/ScrollTags'
import useDebounce from '@hooks/useDebounce'
import { getFetchPublic } from '@request/creator'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

const videoUrl = `${process.env.apiV2}/video?all=true`
const categoriesUrl = `${process.env.apiV2}/video/categories`

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

function PageVideos() {
  const [tab, setTab] = useState('')
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: videos, error } = useSWR(
    `${videoUrl}&page=1&per_page=12&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  )

  const isLoading = !videos && !error

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  const all = () => {
    setCategory('')
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Videos</h4>
        </div>
        <div className="col-12 col-md-9 mb-5">
          <ScrollTags>
            <div className="p-1">
              <button
                onClick={all}
                className={`custom-pills nowrap ${
                  category === '' ? 'active' : ''
                }`}
              >
                All
              </button>
            </div>
            {categories?.map((value) => (
              <div key={value.id} className="p-1">
                <button
                  onClick={() => setCategory(value.id)}
                  className={`custom-pills nowrap ${
                    category === value.id ? 'active' : ''
                  }`}
                >
                  {value.name}
                </button>
              </div>
            ))}
          </ScrollTags>
        </div>
        <div className="col-12 col-md-3 mb-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={'search'}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        {isLoading && <SpinnerLoader />}
        {videos &&
          videos.videos &&
          videos.videos.length > 0 &&
          videos.videos.map((video) => (
            <div key={video.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <VideoCard video={video} />
            </div>
          ))}
        {videos && videos.videos && videos.videos.length === 0 && (
          <h3 className="col display-4">You have not created any videos yet</h3>
        )}
      </div>
    </>
  )
}

export default PageVideos
