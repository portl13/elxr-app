import React from 'react'
import CardEnventReal from './CardEnventReal'
import { Col } from 'reactstrap'
import Slider from 'react-slick'

const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
}



function LoopCardCarrousel({
  events,
  isMyEvent,
  getEventsList,
  isAdded,
  myEventId,
}) {
  const checkMYEvents = (id) => {
    return isMyEvent ? false : myEventId.includes(id)
  }
  return (
    <>
      {isMyEvent ? (
        events.map((item) => (
          <Col key={item.id} xs="12" md="6" lg="4">
            <CardEnventReal
              key={item.id}
              event={item}
              isMyEvent={isMyEvent}
              getEventsList={getEventsList}
              isAdded={isAdded}
            />
          </Col>
        ))
      ) : (
        <div className="row">
        
          {events &&
            events.map((item) => (
              <div className="col-12 col-md-4">
                <CardEnventReal
                  key={item.event?.id}
                  event={item.event}
                  isMyEvent={isMyEvent}
                  isAdded={checkMYEvents(item.event.id)}
                  getEventsList={getEventsList}
                />
              </div>
            ))}
        </div>
        
      )}
    </>
  )
}

export default LoopCardCarrousel
