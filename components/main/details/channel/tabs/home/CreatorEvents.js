import React from 'react'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import EventCard from '@components/creator/cards/EventCard'
import {OPTIONS_SPLIDE_BID_CARD} from "@utils/constant";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import MainEventCard from "@components/main/card/MainEventCard";

function CreatorEvents({ events, isLoading, setTab }) {

  if (events && events.data && events.data.length === 0) {
    return ''
  }

  return (
    <>
      <div className="row mt-5">
        <div className="col-12 d-flex justify-content-between mb-3 align-items-baseline">
          <h4 className="color-font font-size-14 mb-3">Events</h4>
          <span>
            <button className={"no-btn"} onClick={() => setTab("events")}>
              <span className="font-size-14 color-font">See all</span>
            </button>
          </span>
        </div>
        {isLoading && <SpinnerLoader />}
        {events &&
          events.data &&
          events.data.length > 0 &&
          events.data.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <MainEventCard event={event} />
            </div>
          ))}
      </div>
    </>
  )
}
export default CreatorEvents
