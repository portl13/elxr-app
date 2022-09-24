import React, { useEffect, useState } from 'react'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useDebounce from '@hooks/useDebounce'
import { genericFetchPublicWithHeader } from '@request/creator'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ScrollTags from '@components/shared/slider/ScrollTags'
import Pagination from '@components/shared/pagination/Pagination'
import CommunityCardNew from "@components/main/card/CommunityCardNew";

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

function PageCommunities() {
  const limit = 12
  const [page, setPage] = useState(1)
  const [category, setCategory] = useState('active')
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const debounceTerm = useDebounce(search, 500)

  const { data: communities, error } = useSWR(
    `${communitiesUrl}?page=${page}&per_page=${limit}&type=${category}&search=${debounceTerm}`,
    genericFetchPublicWithHeader
  )

  const isLoading = !communities && !error

  const all = () => {
    setCategory('active')
  }

  useEffect(() => {
    if(communities && communities.headers && communities.headers["x-wp-total"]) {
      setTotal(communities.headers["x-wp-total"])
    }
  }, [communities])

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
        {communities && communities.data &&
          communities.data.map((community) => (
            <div key={community.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CommunityCardNew community={community} />
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  )
}

export default PageCommunities
