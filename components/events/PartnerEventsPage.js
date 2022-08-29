import React, { useEffect, useState } from 'react'
import { getFetchPublic } from '@request/creator'
import useSWRImmutable from 'swr/immutable'
import ScrollTags from '@components/shared/slider/ScrollTags'
import useDebounce from '@hooks/useDebounce'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useSWR from 'swr'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import Pagination from '@components/shared/pagination/Pagination'
import EventCardPartner from './EventCardPartner'

const baseUrl = process.env.NEXT_PUBLIC_API_EVENTS_WP

const eventlUrl = `${baseUrl}events`

const categoriesUrl = `${baseUrl}categories?page=1&per_page=30&hide_empty=true`


function PartnerEventsPage() {
  const limit = 12
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const [total, setTotal] = useState(0)
  const debounceTerm = useDebounce(search, 500)

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  const [category, setCategory] = useState('')

  const { data: events, error } = useSWR(
    `${eventlUrl}?page=${page}&per_page=${limit}${
      category ? '&categories=' + category : ''
    }${debounceTerm ? '&search=' + debounceTerm : ''}`,
    getFetchPublic
  )

  const all = () => {
    setCategory('')
  }

  const isLoading = !events && !error

  useEffect(() => {
    if (events && events.total) {
      setTotal(events.total)
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
            {categories &&
              categories.categories &&
              categories?.categories?.map((value) => (
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
          events.events &&
          events.events.length > 0 &&
          events.events.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <EventCardPartner event={event} />
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          {events && events.events && events.events.length > 0 && (
            <Pagination
              totalCount={total || 0}
              onPageChange={setPage}
              currentPage={page}
              pageSize={limit}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default PartnerEventsPage
