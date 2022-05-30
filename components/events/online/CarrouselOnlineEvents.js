import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import useEventOnline from '../../../hooks/useEventOnline';
import MessajeAlert from '../../ui/alert/MessajeAlert';
import HeaderCarrousel from "../helpers/HeaderCarrousel";
import LoopCarrouselOnline from './LoopCarrouselOnline';
import SkeletonResponsive from '../helpers/SkeletonResponsive';

const CarrouselOnlineEvents = ({ category, params, eventCount, setEventCount,
    myEventId, link = null, hidelink = false, isAllLoading, getEventsList }) => {
    const url = process.env.NEXT_PUBLIC_API_EVENTS_WP + 'events/'
    const { data, error } = useEventOnline(url, params);

    const isLoading = !data && !error

    const noEvent = data && data.events?.length === 0;

    useEffect(() => {
        if (data && data?.events.length) {

            if (eventCount.indexOf(category) === -1)
                setEventCount((prop) => [...eventCount, category])
        }
    }, [data])

    const renderList = () => {
        return (isLoading || isAllLoading ? <SkeletonResponsive /> :
            <LoopCarrouselOnline events={data.events} isMyEvents={false}
                getEventsList={getEventsList}
                myEventId={myEventId} />)
    }

    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
    }
    return (
        <>
            {data?.events?.length ? <>
                <HeaderCarrousel
                    text={capitalizeFirstLetter(category)}
                    link={link ? link : `/event/online/category/${category.toLowerCase()}`}
                    hidelink={hidelink}
                />
                <Row className="mb-2 event-caroual-section">
                    {renderList()}
                    {noEvent || error && <Col className="mb-5" xs="12">
                        <MessajeAlert typeIcon={"heart"} messaje={`we cannot find ${category} events`}
                            type={"danger"} textAlert={"Sorry!"} /> </Col>}
                </Row>
            </>
                : ""}</>
    );
}

export default CarrouselOnlineEvents;
