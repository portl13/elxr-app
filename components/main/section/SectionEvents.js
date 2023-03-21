import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import { getFetchPublic } from '@request/creator'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import useSWR from 'swr'
import { Splide, SplideTrack, SplideSlide } from '@splidejs/react-splide'
import { OPTIONS_SPLIDE_EVENTS } from '@utils/constant'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons'
import useSWRImmutable from 'swr/immutable'
import MainEventCard from '@components/main/card/MainEventCard'
import ScrollTags from '@components/shared/slider/ScrollTags'
import {useCategories} from "@context/EventsContext";

const eventlUrl = `${process.env.apiV2}/channel-event?all=true`
const categoriesUrl = `${process.env.apiV2}/channel-event/categories?hide=true`

function SectionEvents({ search }) {
  const [filter, setFilter] = useState('desc')
  //const [category, setCategory] = useState('');
  const { cat: category } = useCategories();

  const refSlide = useRef()

  const next = () => {
    refSlide.current.splide.go('>')
  }

  const prev = () => {
    refSlide.current.splide.go('<')
  }

  const { data: events, error } = useSWR(
    `${eventlUrl}&page=1&per_page=8&order=${filter}&search=${search}&category=${category.slug}&date_filter=upcoming`,
    getFetchPublic,
    { revalidateOnFocus: false }
  )

  //const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic)

  // const all = () => {
  //   setCategory('')
  // }

  const isLoading = !events && !error

  if (events?.data?.length === 0) {
    return ''
  }

  return (
    <section className={'section-dark'}>
      <div className="row mb-2">
        <div className="col-12 mb-3 d-flex flex-row  justify-content-between">
          <div>
          <h4 className="section-event-title ">
          Upcoming top events           
          </h4>
          <span className='sub-title-event'>
          Join most engaging and active fitness communities to help you meet your fitness goals.
          </span>
          </div>
          <Link href="/events">
              <a
                className={`text-capitalize mt-3 text-font nowrap d-flex d-lg-none ailgn-items-start font-size-12`}
              >
                See All
              </a>
            </Link>
        </div>

        <div className="col-12 mb-3">
          <div className="row mx-0 d-flex justify-content-between">
            <div className="col-12 col-lg-10 p-0 mx-0">
              {/*<ScrollTags>*/}
              {/*  <div className="p-1">*/}
              {/*    <span*/}
              {/*      onClick={all}*/}
              {/*      className={`text-capitalize section-category nowrap pointer color-font-grey ${*/}
              {/*        category === '' ? 'active' : ''*/}
              {/*      }`}*/}
              {/*    >*/}
              {/*      All*/}
              {/*    </span>*/}
              {/*  </div>*/}
              {/*  {categories?.map((value) => (*/}
              {/*    <div key={value.label} className="p-1">*/}
              {/*      <span*/}
              {/*        onClick={() => setCategory(value.value)}*/}
              {/*        className={`text-capitalize section-category nowrap pointer ${*/}
              {/*          category === value.value ? 'active' : ''*/}
              {/*        }`}*/}
              {/*      >*/}
              {/*        {value.label}*/}
              {/*      </span>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</ScrollTags>*/}
            </div>
              <div className='col-12 col-md-2 d-flex align-items-end justify-content-end'>
            <Link href="/events">
              <a
                className={`section-more-btn-light nowrap  d-none d-lg-block mr-md-0 text-center`}
              >
                Discover more events
              </a>
            </Link>
              </div>
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
