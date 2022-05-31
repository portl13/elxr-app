import React, { useContext, useEffect, useState } from 'react'
import getUnixTime from 'date-fns/getUnixTime'
import { FilterContext } from '../../../context/FilterContext'
import MessajeAlert from '../../ui/alert/MessajeAlert'
import CarrouselRealEvents from './CarrouselRealEvents'
import Loader from '../../loader'

function RealEvents({
  longitude,
  latitude,
  eventRealCount,
  setRealEventCount,
  eventLoader,
  myEventId,
  getEventsList,
  isAllLoading,
}) {
  const {
    categoriesRealEvent,
    startRealEvent,
    showRealMessage,
    setShowRealMessage,
  } = useContext(FilterContext)

  const now = getUnixTime(startRealEvent)

  const [catCount, setCatCount] = useState(0)

  useEffect(() => {
    if (catCount === categoriesRealEvent.length && !eventRealCount.length) {
      setShowRealMessage(true)
    }
  }, [catCount])
  useEffect(() => {
    if (categoriesRealEvent.length && eventRealCount.length) {
      let label = categoriesRealEvent.map((e) => e.label)
      let count = [...eventRealCount]
      for (let i = count.length; i >= 0; i--) {
        if (label.indexOf(count[i]) === -1) count.splice(i, 1)
      }
      setShowRealMessage(!count.length)
    }
  }, [categoriesRealEvent, eventRealCount])

  if (eventLoader) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Loader color="primary" />
      </div>
    )
  }
  return (
    <div style={{ padding: '0 45px 0 44px' }}>
      {showRealMessage && (
        <MessajeAlert
          typeIcon={'warning'}
          messaje={'No event(s) are available for this location .'}
          type={'warning'}
        />
      )}
      {categoriesRealEvent.length > 0 ? (
        categoriesRealEvent.map((cat) => {
          const body = {
            // "geoloc": true,
            // "geoloc_lng": longitude,
            // "geoloc_lat": latitude,
            // "start_date": now,
            // "categories": cat.value,
            // "page": 1,
            // "per_page": 3
            location: {
              longitude,
              latitude,
            },
            maxDistanceMiles: 1,
            startingAfter: now,
            categories: [cat.value],
            page: 1,
            pageSize: 3,
          }
          return (
            <CarrouselRealEvents
              body={body}
              key={cat.value}
              category={cat.label}
              setRealEventCount={setRealEventCount}
              eventRealCount={eventRealCount}
              setCatCount={setCatCount}
              catCount={catCount}
              isAllLoading={isAllLoading}
              getEventsList={getEventsList}
              myEventId={myEventId}
            />
          )
        })
      ) : (
        <MessajeAlert
          typeIcon={'warning'}
          messaje={'Please select one or more categories'}
          type={'warning'}
          textAlert={'Warning!'}
        />
      )}
    </div>
  )
}

export default RealEvents
