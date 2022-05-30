import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import { Col, Row } from 'reactstrap'

import Layout from '../../../components/layout/Layout'
import LoopOnlineLiveChannel from '../../../components/events/online/CarrouselChannelEvents';
import MessajeAlert from '../../../components/ui/alert/MessajeAlert';
import LooSkeletonCarrusel from '../../../components/events/helpers/LooSkeletonCarrusel';
import { getArtistList } from "../../api/events.api"

export default function EvetnsOnlineByCategory() {
    const router = useRouter();
    const query = router.query;
    const { slug = null } = query;
    const [artistList, setArtist] = useState([]);

    const getArtist = () => {
        getArtistList({ per_page: 20, page: 1, category: slug }).then((res) => {
            setArtist(res.data);
        }).catch(() => { })
    }
    useEffect(() => {
        if (slug)
            getArtist()
    }, [slug])

    return (
        <Layout>
            <Col className="mb-3" xs="12" >
                <Row>
                    <Col xs="12"><h2 className="text-capitalize">Live {slug} Channels</h2></Col>
                    {/* {isLoading && <LooSkeletonCarrusel numberCard={6} />} */}
                    {artistList.length && <LoopOnlineLiveChannel artistList={artistList} />}
                    {/* {noEvent || error && <Col className="mb-5" xs="12">
                        <MessajeAlert typeIcon={"heart"} messaje={`we cannot find ${category} events`}
                            type={"danger"} textAlert={"Sorry!"} /> </Col>} */}
                </Row>
            </Col>
        </Layout>
    )
}
