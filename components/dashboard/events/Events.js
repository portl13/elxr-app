import React, { useContext, useState } from 'react'
import { getCategories, getChannelEvents } from '@request/dashboard'
import useSWR from 'swr'
import EventCard from './EventCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { UserContext } from '@context/UserContext'
import useDebounce from '@hooks/useDebounce'
import InputDashSearch from '@components/shared/form/InputDashSearch'
import useSWRImmutable from 'swr/immutable'
import ScrollTags from '@components/shared/slider/ScrollTags'
import PlusIcon from '@icons/PlusIcon'
import EventModalSelectChannel from './EventModalSelectChannel'
import { useRouter } from 'next/router'

const baseUrl = process.env.apiV2
const eventsUrl = `${baseUrl}/channel-event/`
const categoriesUrl = `${baseUrl}/channel-event/categories`

function Events() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const token = user?.token

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const debounceTerm = useDebounce(search, 500)

  const url = `${eventsUrl}?author=${user.id}&page${page}&per_page=20&category=${category}&search=${debounceTerm}`

  const {
    data: events,
    error,
    mutate,
  } = useSWR(token ? [url, token] : null, getChannelEvents)

  const { data: categories } = useSWRImmutable(
    token ? [categoriesUrl, token] : null,
    getCategories
  )

  const isLoading = !events && !error

  const all = () => {
    setCategory('')
  }

  const mutateEvents = async (eventId) => {
    const newEvents = {
      data: [...events.data.filter((event) => event.id !== eventId)],
      items: Number(events.items) - 1,
      status: events.status,
      total_items: Number(events.total_items) - 1,
    }

    return await mutate(newEvents, { revalidate: true })
  }

  const createEvent = (id) => {
    setOpen(!open)
    router.push(`/dashboard/channel/${id}/create-event`)
  }

  return (
    <>
      <div className="container ">
        <div className="d-flex  justify-content-between mb-3">
          <h2 className="title-dashboard">Events</h2>
          <div className="d-flex justify-content-between align-items-center">
            <InputDashSearch
              value={search}
              name={'search'}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="btn-create-client">
              <button onClick={() => setOpen(!open)} className="btn btn-create">
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create An Event</span>
              </button>
            </div>
          </div>
        </div>

        <ScrollTags>
          <div className="p-1">
            <button
              onClick={all}
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
        </ScrollTags>

        <div className="row mt-5">
          {isLoading && <SpinnerLoader />}
          {events && events.data && events.data.length === 0 && (
            <h3 className="col display-4">
              You have not created any events yet
            </h3>
          )}
          {events &&
            events.data &&
            events.data.length > 0 &&
            events.data.map((event) => (
              <EventCard
                mutateEvents={mutateEvents}
                event={event}
                key={event.id}
              />
            ))}
        </div>
      </div>

      {open && (
        <EventModalSelectChannel
          open={open}
          setOpen={setOpen}
          handleCreate={createEvent}
        />
      )}
    </>
  )
}

export default Events
