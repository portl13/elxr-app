import React from 'react';
import CardEnventReal from './CardEnventReal';
import Carousel from 'react-multi-carousel';
import { Col } from 'reactstrap';

function LoopCardCarrousel({ events, isMyEvent, getEventsList, isAdded, myEventId }) {
    const checkMYEvents = (id) => {
        return isMyEvent ? false : myEventId.includes(id)
    }
    return (
        <>
            {isMyEvent ?
                events.map(item => (
                    <Col key={item.id} xs="12" md="6" lg="4">
                        <CardEnventReal key={item.id} event={item} isMyEvent={isMyEvent}
                            getEventsList={getEventsList} isAdded={isAdded} />
                    </Col>))
                : <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    draggable
                    focusOnSelect={false}
                    itemclassName="col"
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                        desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 3
                        },
                        mobile: {
                            breakpoint: {
                                max: 767,
                                min: 0
                            },
                            items: 1
                        },
                        tablet: {
                            breakpoint: {
                                max: 1023,
                                min: 768
                            },
                            items: 2
                        }
                    }}
                    showDots
                    sliderclassName=""
                    slidesToSlide={1}
                    swipeable
                >
                    {events && events.map(item => (
                        <CardEnventReal key={item.event?.id} event={item.event}
                            isMyEvent={isMyEvent}
                            isAdded={checkMYEvents(item.event.id)}
                            getEventsList={getEventsList} />))}
                </Carousel>}
        </>
    )
}

export default LoopCardCarrousel;
