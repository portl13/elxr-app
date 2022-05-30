import React from 'react';
import FilterEventImage from '../../../helpers/FilterEventImage';
import CardEventOnline from './CardEventOnline';
import { Col } from 'reactstrap';


const LoopCarrouselOnline = (props) => {
    const checkMYEvents = (id) => {
        return props.isMyEvents ? false : props.myEventId.includes(id)
    }

    return (
        <>
            {props.events && props.events.map(item => {
                const event = {
                    imageUrl: FilterEventImage(item.image),
                    title: item.title,
                    startDateTime: item.start_date,
                    id: item.slug,
                    endDateTime: item.end_date,
                    timezone: item.timezone_abbr,
                    description: item.description,
                    event_id: item.id
                }

                return (
                    <Col key={item.id} xs="12" md="6" lg="4">
                        <CardEventOnline key={item.id} event={event} {...props} isAdded={checkMYEvents(item.id)} />
                    </Col>)
            })}
        </>
    );
}

export default LoopCarrouselOnline;
