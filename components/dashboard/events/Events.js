import React, { useContext, useEffect, useState } from 'react'
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
import Pagination from '@components/shared/pagination/Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import EventModalSelect from './EventModalSelect'

const baseUrl = process.env.apiV2
const eventsUrl = `${baseUrl}/channel-event/`
const categoriesUrl = `${baseUrl}/channel-event/categories`

function Events() {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const token = user?.token
  const limit = 20
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [openGolive, setOpenGolive] = useState(false)
  const [search, setSearch] = useState('')
  const debounceTerm = useDebounce(search, 500)

  const {
    data: events,
    error,
    mutate,
  } = useSWR(
    token
      ? [
          `${eventsUrl}?author=${user?.id}&page=${page}&per_page=${limit}&category=${category}&search=${debounceTerm}`,
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

  const handleGoLive = (id) => {
    router.push(`/dashboard/event/${id}/`)
  }

  useEffect(() => {
    if (events && events.total_items) {
      setTotal(events.total_items)
    }
  }, [events])

  return (
    <>
      <div className="container ">
        <div className="d-flex flex-column flex-md-row justify-content-between mb-3">
          <h2 className="title-dashboard">Events</h2>
          <div className="d-flex flex-column flex-md-row  justify-content-between align-items-left align-items-md-center">
            <InputDashSearch
              className="mr-md-3 mb-3 mb-md-0"
              value={search}
              name={'search'}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="btn-create-client mb-3 mb-md-0">
              <button
                onClick={() => setOpen(!open)}
                className="btn btn-create  w-100"
              >
                <i>
                  <PlusIcon className="btn-create-icon" />
                </i>
                <span>Create An Event</span>
              </button>
            </div>
            <div className="btn-create-client ml-md-3">
              <button
                onClick={() => setOpenGolive(!openGolive)}
                className="btn btn-borde-pill w-100"
              >
                <i>
                  <FontAwesomeIcon icon={faVideo} className="btn-create-icon" />
                </i>
                <span>Go Live</span>
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

        <div className="row mt-3 mt-md-5">
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
      </div>

      {open && (
        <EventModalSelectChannel
          open={open}
          setOpen={setOpen}
          handleCreate={createEvent}
        />
      )}
      {openGolive && (
        <EventModalSelect
          open={openGolive}
          setOpen={setOpenGolive}
          handleGoLive={handleGoLive}
          token={token}
          user={user}
        />
      )}
    </>
  )
}

export default Events
