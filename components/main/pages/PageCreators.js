import React, { useEffect, useState } from 'react'
import useDebounce from '@hooks/useDebounce'
import useSWR from 'swr'
import { getFetchPublic } from '@request/creator'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import CreatorCard from '../card/CreatorCard'
import Pagination from '@components/shared/pagination/Pagination'

const url = `${process.env.apiV2}/creator`

function PageCreators() {
  const limit = 12

  const [search, setSearch] = useState('')
  const [page, setpage] = useState(1)
  const [total, setTotal] = useState(0)

  const debounceTerm = useDebounce(search, 500)

  const { data: creators, error } = useSWR(
    `${url}?page=${page}&per_page=${limit}&search=${debounceTerm}&count=true`,
    getFetchPublic
  )

  const isLoading = !creators && !error

  useEffect(() => {
    if (creators && (creators.totals > 0)) {
      setTotal(creators.totals)
    }
  }, [creators])

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Creators</h4>
        </div>
      </div>
      <div className="row d-flex  justify-content-md-end">
        <div className="col-12 col-md-3 mb-4 mb-md-5 ">
          <InputDashSearch
            value={search}
            name={'search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {creators &&
          creators.users.length > 0 &&
          creators.users &&
          creators.users.map((creator) => (
            <div key={creator.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <CreatorCard creator={creator} />
            </div>
          ))}
      </div>
      <div className="row ">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setpage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  )
}

export default PageCreators
