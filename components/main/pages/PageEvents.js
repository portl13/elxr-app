import EventCard from '@components/creator/cards/EventCard'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import ScrollTags from '@components/shared/slider/ScrollTags'
import useDebounce from '@hooks/useDebounce'
import { getFetchPublic } from '@request/creator'
import React, { useState } from 'react'
import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`
const categoriesUrl = `${process.env.apiV2}/channel-event/categories`

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

function PageEvents() {
  const [tab, setTab] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=12&category=${category}&search=${debounceTerm}`,
    getFetchPublic
  )

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)
  console.log(
    '🚀 ~ file: PageEvents.js ~ line 48 ~ PageEvents ~ categories',
    categories
  )

  const isLoading = !events && !error

  const all = () => {
    setCategory('')
  }

  return (
    <>
      <div className="row">
        <div className="col-12">
          <h4 className="mb-4 font-weight-bold">Events</h4>
        </div>
        <div className="col-12 col-md-9 mb-5">
          <ScrollTags>
            <div className="p-1">
              <button
                onClick={all}
                className={`custom-pills nowrap ${category === '' ? 'active' : ''}`}
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
        {events && events.data && events.data.length === 0 && (
          <h3 className="col display-4">You have not created any events yet</h3>
        )}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <EventCard event={event} />
            </div>
          ))}
      </div>
    </>
  )
}

export default PageEvents
