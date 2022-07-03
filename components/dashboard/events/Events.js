import React, { useContext, useState } from 'react'
import { getCategories, getChannelEvents } from '@request/dashboard'
import useSWR from 'swr'
import EventCard from './EventCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { UserContext } from '@context/UserContext'
import useDebounce from '@hooks/useDebounce'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useSWRImmutable from 'swr/immutable'
const baseUrl = process.env.apiV2
const eventsUrl = `${baseUrl}/channel-event/`
const categoriesUrl = `${baseUrl}/channel-event/categories`

function Events() {
  const { user } = useContext(UserContext)
  const token = user?.token
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const { data: events, error } = useSWR(
    token
      ? [
          `${eventsUrl}?page${page}&per_page=20&category=${category}&search=${debounceTerm}`,
          token,
        ]
      : null,
    getChannelEvents
  )

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )

  const isLoading = !events && !error

  return (
    <div className="container ">
      <div className="d-flex  justify-content-between">
        <h2 className="title-dashboard">Events</h2>
        <div className="d-flex justify-content-between align-items-center">
          <InputDashSearch
            value={search}
            name={'search'}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center justify-content-md-start mt-4 mb-5">
        <div className="p-1">
          <button
            onClick={() => setCategory('')}
            className={`btn btn-transparent b-white ${
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
              className={`btn btn-transparent b-white ${
                category === value.id ? 'active' : ''
              }`}
            >
              {value.name}
            </button>
          </div>
        ))}
      </div>
      <div className="row mt-5">
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
      </div>
    </div>
  )
}

export default Events
