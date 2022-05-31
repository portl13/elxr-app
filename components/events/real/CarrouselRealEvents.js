import React, { useEffect } from 'react'
import LoopCardCarrousel from './LoopCardCarrousel'
import SkeletonResponsive from '../helpers/SkeletonResponsive'

import HeaderCarrousel from '../helpers/HeaderCarrousel'
import useEventReal from '../../../hooks/useEventReal'
import { stringToSlug } from '../../../lib/stringToSlug'

const CarrouselRealEvents = ({
  category,
  body,
  eventRealCount,
  setRealEventCount,
  setCatCount,
  catCount,
  myEventId,
  getEventsList,
  isAllLoading,
}) => {
  const url = `/api/events/${stringToSlug(category)}`

  const { data, error } = useEventReal(url, body)
  const isLoading = !data && !error

  const noEvent = data && data.items?.length === 0
  useEffect(() => {
    setCatCount(catCount + 1)
    if (data?.items.length) {
      if (eventRealCount.indexOf(category) === -1)
        setRealEventCount((prop) => [...eventRealCount, category])
    }
  }, [data])
  const renderList = () => {
    return isLoading || isAllLoading ? (
     <div className="row"><SkeletonResponsive /></div> 
    ) : (
      <LoopCardCarrousel
        events={data.items}
        isMyEvent={false}
        myEventId={myEventId}
        getEventsList={getEventsList}
      />
    )
  }
  return (
    <>
      {data?.items.length ? (
        <>
          <HeaderCarrousel
            text={category}
            hidelink={true}
            link={`/event/location/category/${category.toLowerCase()}`}
          />
          <div className="mb-2">{renderList()}</div>
        </>
      ) : (
        ''
      )}
    </>
  )
}

export default CarrouselRealEvents
