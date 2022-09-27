import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Pagination from '@components/shared/pagination/Pagination'
import ScrollTags from '@components/shared/slider/ScrollTags'
import useDebounce from '@hooks/useDebounce'
import { getFetchPublic } from '@request/creator'
import EventCardNew from "@components/main/card/EventCardNew";
import EventCard from "@components/creator/cards/EventCard";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`
const categoriesUrl = `${process.env.apiV2}/channel-event/categories`

function PageEvents() {
  const limit = 12;
  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)
  const debounceTerm = useDebounce(search, 500)

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=${page}&per_page=${limit}&category=${category}&search=${debounceTerm}`,
    getFetchPublic
  )

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  const isLoading = !events && !error

  const all = () => {
    setCategory('')
  }

  useEffect(() => {
    if(events && events.total_items) {
      setTotal(events.total_items)
    }
  }, [events])

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-9 mb-4 mb-md-5">
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
        <div className="col-12 col-md-3 mb-4 mb-md-5">
          <div className="d-flex  justify-content-md-end">
            <InputDashSearch
              value={search}
              name={'search'}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="row">
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div key={event.id} className="col-6 col-md-6 col-lg-3 mb-4">
              <EventCard event={event} />
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

export default PageEvents
