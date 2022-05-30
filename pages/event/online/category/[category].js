import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { format } from 'date-fns';
import { Col, Row } from 'reactstrap'

import Layout from '../../../../components/layout/Layout'
import useCategoryOnlineEvent from '../../../../hooks/useCategoryOnlineEvent';
import LoopCarrouselOnline from '../../../../components/events/online/LoopCarrouselOnline';
import MessajeAlert from '../../../../components/ui/alert/MessajeAlert';
import LooSkeletonCarrusel from '../../../../components/events/helpers/LooSkeletonCarrusel';
import { FilterContext } from '../../../../context/FilterContext';

import { getMyEvents } from '../../../api/events.api'
import { UserContext } from "../../../../context/UserContext";

export default function EvetnsOnlineByCategory() {

    const router = useRouter();

    const { category } = router.query

    const {
        startEvent,
        endEvent
    } = useContext(FilterContext)
    const { user } = useContext(UserContext);
    const [myEventId, setMyEventId] = useState([]);
    const [isAllLoading, setisLoading] = useState(false);

    const getList = () => {
        setisLoading(true)
        getMyEvents(user, { user_id: user.id, type: "online" }).then((res) => {
            if (res.data.data.events) {
                setMyEventId(res.data.data.events.map(e => e.id))
            } else setMyEventId([])
            setisLoading(false)
        }).catch(() => setisLoading(false))
    }
    useEffect(() => {
        if (user && user.id)
            getList()
    }, [user])

    const url = process.env.NEXT_PUBLIC_API_EVENTS_WP + 'events';

    const start = format(new Date(startEvent), "yyyy-MM-dd '00:00:00'")

    const end = endEvent ? format(new Date(endEvent), "yyyy-MM-dd '23:59:59'") : ''

    const params = {
        "page": 1,
        "per_page": 100,
        "start_date": start,
    }

    if (end) { params["end_date"] = end }
    if (category === "featured") {
        params["featured"] = true
    } else { params["categories"] = category }


    const { data, error } = useCategoryOnlineEvent(url, params, category)

    const isLoading = !data && !error;

    const noEvent = data && data.events.length === 0;
    function capitalizeFirstLetter(string) {
        return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
    }
    return (
        <Layout>
            <Col className="mb-3" xs="12" >
                <Row>
                    <Col xs="12"><h2 className="text-capitalize">
                        {category !== "featured" ? capitalizeFirstLetter(category) : `Featured Events`}</h2></Col>
                    {isLoading && <LooSkeletonCarrusel numberCard={6} />}
                    {data && <LoopCarrouselOnline events={data.events}
                        isMyEvents={false}
                        getEventsList={getList}
                        myEventId={myEventId}
                        isLoading={isAllLoading} />}
                    {noEvent || error && <Col className="mb-5" xs="12">
                        <MessajeAlert typeIcon={"heart"} messaje={`we cannot find ${category} events`}
                            type={"danger"} textAlert={"Sorry!"} /> </Col>}
                </Row>
            </Col>
        </Layout>
    )
}
