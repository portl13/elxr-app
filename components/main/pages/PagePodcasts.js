import CardAudio from '@components/creator/cards/CardAudio'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ScrollTags from '@components/shared/slider/ScrollTags'
import useDebounce from '@hooks/useDebounce'
import { getFetchPublic } from '@request/creator'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

const podcastslUrl = `${process.env.apiV2}/podcasts?all=true`
const categoriesUrl = `${process.env.apiV2}/podcasts/categories`



function PagePodcasts() {
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: audios, error } = useSWR(
    `${podcastslUrl}&page=1&per_page=12&search=${debounceTerm}&category=${category}`,
    getFetchPublic
  )

  const isLoading = !audios && !error

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  const all = () => {
    setCategory('')
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Podcasts</h4>
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
        {audios &&
          audios.audios &&
          audios.audios.length > 0 &&
          audios.audios.map((audio) => (
            <div key={audio.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CardAudio audio={audio} />
            </div>
          ))}
      </div>
    </>
  )
}

export default PagePodcasts
