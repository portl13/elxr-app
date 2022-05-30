import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import MessajeAlert from '../../ui/alert/MessajeAlert';
import LoopCarrouselOnline from './LoopCarrouselOnline';
import SkeletonResponsive from '../helpers/SkeletonResponsive';

const CarrouselOnlineEvents = ({ isLoading, events,getList }) => {
    useEffect(() => {
        getList()
    }, [])
    if (isLoading)
        return (<Row className="mb-2 event-caroual-section">
            <SkeletonResponsive />
        </Row>)
    return (
        <>
            <Row className="mb-2 event-caroual-section">
                {events.length ? <LoopCarrouselOnline events={events} isMyEvents={true}
                    getEventsList={getList} /> : ""}
                {!events.length && <Col className="mb-5" xs="12">
                    <MessajeAlert typeIcon={"heart"} messaje={`we cannot find any events added to "My Events"`}
                        type={"danger"} textAlert={"Sorry!"} /> </Col>}
            </Row>
        </>
    );
}

export default CarrouselOnlineEvents;
