import React, { useEffect } from 'react';
import { Col, Row } from "reactstrap";
import LoopCardCarrousel from './LoopCardCarrousel';
import SkeletonResponsive from '../helpers/SkeletonResponsive';


import MessajeAlert from '../../ui/alert/MessajeAlert';
import HeaderCarrousel from '../helpers/HeaderCarrousel';
import useEventReal from '../../../hooks/useEventReal';
import { stringToSlug } from '../../../lib/stringToSlug';

const CarrouselRealEvents = ({ category, body, eventRealCount, setRealEventCount,
    setCatCount, catCount, myEventId, getEventsList, isAllLoading }) => {
    const url = `/api/events/${stringToSlug(category)}`;

    const { data, error } = useEventReal(url, body);
    const isLoading = !data && !error

    const noEvent = data && data.items?.length === 0;
    useEffect(() => {
        setCatCount(catCount + 1)
        if (data?.items.length) {
            if (eventRealCount.indexOf(category) === -1)
                setRealEventCount((prop) => [...eventRealCount, category])
        }
    }, [data])
    const renderList = () => {
        return (isLoading || isAllLoading ? <SkeletonResponsive />
            : <LoopCardCarrousel events={data.items}
                isMyEvent={false}
                myEventId={myEventId} getEventsList={getEventsList} />)
    }
    return (
        <>
            {data?.items.length ? <>
                <HeaderCarrousel text={category}
                    hidelink={true}
                    link={`/event/location/category/${category.toLowerCase()}`} />
                <Row className="mb-2">
                    {renderList()}
                </Row>
            </>
                : ""}
        </>
    );
}

export default CarrouselRealEvents;
