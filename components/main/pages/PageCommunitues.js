import React, { useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import CommunityCard from '@components/creator/cards/CommunityCard'
import useDebounce from '@hooks/useDebounce'
import { getFetchPublic } from '@request/creator'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ScrollTags from '@components/shared/slider/ScrollTags'

const communitiesUrl = `${process.env.bossApi}/groups`

const tabs = [
  {
    tab: 'active',
    label: 'All',
  },
  {
    tab: 'newest',
    label: 'Newest',
  },
  {
    tab: 'alphabetical',
    label: 'Alphabetical',
  },
  {
    tab: 'random',
    label: 'Random',
  },
  {
    tab: 'popular',
    label: 'Popular',
  },
]

function PageCommunitues() {
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('active')
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=${page}&per_page=20&type=${category}&search=${debounceTerm}`,
    getFetchPublic
  )

  const isLoading = !communities && !error

  const all = () => {
    setCategory('active')
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Communities</h4>
        </div>
        <div className="col-12 col-md-9 mb-5">
          <ScrollTags>
            {tabs.map((value) => (
              <div key={value.tab} className="p-1">
                <button
                  onClick={() => setCategory(value.tab)}
                  className={`custom-pills nowrap ${
                    category === value.tab ? 'active' : ''
                  }`}
                >
                  {value.label}
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
        {communities &&
          communities.map((community) => (
            <div key={community.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CommunityCard community={community} />
            </div>
          ))}
      </div>
    </>
  )
}

export default PageCommunitues
