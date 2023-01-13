import EventCard from '@components/creator/cards/EventCard'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import { FILTERS_POST, OPTIONS_SPLIDE_EVENTS } from '@utils/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import useSWRImmutable from 'swr/immutable'
import MainEventCard from '@components/main/card/MainEventCard'
import ScrollTags from '@components/shared/slider/ScrollTags'

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`
const categoriesUrl = `${process.env.apiV2}/channel-event/categories?hide=true`

function SectionEvents({ search }) {
  const [filter, setFilter] = useState('desc')
  const [category, setCategory] = useState('')

  const refSlide = useRef()

  const next = () => {
    refSlide.current.splide.go('>')
  }

  const prev = () => {
    refSlide.current.splide.go('<')
  }

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category}&date_filter=upcoming`,
    getFetchPublic,
    { revalidateOnFocus: false }
  )

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  const all = () => {
    setCategory('')
  }

  const isLoading = !events && !error

  if (events?.data?.length === 0) {
    return ''
  }

  return (
    <section className={'section-dark'}>
      <div className="row mb-2">
        <div className="col-12 mb-3 d-flex justify-content-between">
          <h4 className="section-main-title text-capitalize">
            Upcoming livestream events
          </h4>
          <Link href="/events">
              <a
                className={`text-capitalize text-font nowrap d-flex d-lg-none font-size-12 align-items-center`}
              >
                See All
              </a>
            </Link>
        </div>

        <div className="col-12 mb-3">
          <div className={'d-flex mb-4'}>
            {FILTERS_POST.map((fil) => (
              <button
                key={fil.value}
                onClick={() => setFilter(fil.value)}
                className={`custom-pills nowrap ${
                  filter === fil.value ? 'active' : null
                }`}
              >
                {fil.label}
              </button>
            ))}
          </div>

          <div className="row mx-0 d-flex justify-content-between">
            <div className="col-12 p-0 mx-0">
              <ScrollTags>
                <div className="p-1">
                  <span
                    onClick={all}
                    className={`text-capitalize section-category nowrap pointer ${
                      category === '' ? 'active' : ''
                    }`}
                  >
                    All
                  </span>
                </div>
                {categories?.map((value) => (
                  <div key={value.label} className="p-1">
                    <span
                      onClick={() => setCategory(value.value)}
                      className={`text-capitalize section-category nowrap pointer ${
                        category === value.value ? 'active' : ''
                      }`}
                    >
                      {value.label}
                    </span>
                  </div>
                ))}
              </ScrollTags>
            </div>

            <Link href="/events">
              <a
                className={`text-capitalize section-more-btn nowrap  d-none d-lg-block`}
              >
                Discover more events
              </a>
            </Link>
          </div>
        </div>
      </div>

      {isLoading && <SpinnerLoader />}

      <div className="section-creator">
        <Splide ref={refSlide} options={OPTIONS_SPLIDE_EVENTS} hasTrack={false}>
          <SplideTrack>
            {events &&
              events.data &&
              events.data.length > 0 &&
              events.data.map((event) => (
                <SplideSlide key={event.id}>
                  <MainEventCard event={event} />
                </SplideSlide>
              ))}
          </SplideTrack>
        </Splide>
      </div>

      <div className="row mx-0 d-flex justify-content-end mt-4">
        <button onClick={prev} className="arrow-slide section-arrow-btn mr-3">
          <FontAwesomeIcon className="center-absolute" icon={faChevronLeft} />
        </button>
        <button onClick={next} className="arrow-slide section-arrow-btn mr-4">
          <FontAwesomeIcon className="center-absolute" icon={faChevronRight} />
        </button>
      </div>
    </section>
  )
}

export default SectionEvents
