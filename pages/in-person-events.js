import React, { useContext, useState, useEffect } from 'react'
import { usePosition } from 'use-position';
import Layout from '../components/layout/Layout';
import { FilterContext } from '../context/FilterContext';
import EventsRealShowcase from '../components/events/EventsRealShowcase';
import { getEventCategories } from './api/events.api';
import { UserContext } from '../context/UserContext';
import GeoPositionProvider from '../context/GeoPositionContext';
import Head from 'next/head';


const InPersonEvents = () => {
    const { user } = useContext(UserContext);
    const [eventLoader, setEventLoader] = useState(false);
    const watch = true;
    const { latitude, longitude } = usePosition(watch);

    return (
        <GeoPositionProvider>
        <Layout>
        <Head>
                <title>WeShare | Channel</title>
            </Head>
        
            <EventsRealShowcase
            latitude={latitude}
            longitude={longitude}
            eventLoader={eventLoader}
            />
            
        </Layout>
        </GeoPositionProvider> 
    )
}

export default InPersonEvents