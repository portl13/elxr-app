import React, { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import LoopCardCarrousel from './LoopCardCarrousel';
import MessajeAlert from '../../ui/alert/MessajeAlert';
import SkeletonResponsive from '../helpers/SkeletonResponsive';

const CarrouselRealEvents = ({ isMyEvent, events, getList,isLoading }) => {
    useEffect(() => {
        getList()
    }, [])
    if (isLoading)
        return (<Row className="mb-2 event-caroual-section">
            <SkeletonResponsive />
        </Row>)
    return (
        <>
            <Row className="mb-2">
                {events.length ? <LoopCardCarrousel events={events} isMyEvent={isMyEvent}
                    getEventsList={getList} /> : ""}
                {!events.length && <Col className="mb-5" xs="12">
                    <MessajeAlert typeIcon={"heart"} messaje={`we cannot find any events added to "My Events"`}
                        type={"danger"} textAlert={"Sorry!"} />
                </Col>}
            </Row>
        </>
    );
}

export default CarrouselRealEvents;
