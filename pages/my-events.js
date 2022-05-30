import Layout from '../components/layout/Layout';
import Head from "next/head";
import { Col } from 'reactstrap';
import { useContext } from 'react';
import LoopMyEvents from '../components/my_events/LoopMyEvents';
import LooSkeletonCarrusel from '../components/events/helpers/LooSkeletonCarrusel';
import useMyEvents from '../hooks/useMyEvents';
import { UserContext } from '../context/UserContext';

export default function MyEvents() {

    const { user } = useContext(UserContext);

    const { data, isLoading } = useMyEvents(user?.id)
    return (
        <Layout>
            <Head>
                <title>My Events</title>
            </Head>
            <Col xs="12">
                <div className="tribe-events-wrapper">
                    <div className="tribe-container">
                        <div className="button-tag">Today</div>
                        <div className="date-panel">August 29 - September 17</div>
                    </div>
                </div>
                <div className="row">
                    {isLoading && <LooSkeletonCarrusel />}
                    {data && <LoopMyEvents events={data} />}
                </div>
            </Col>
        </Layout>
    )
}

