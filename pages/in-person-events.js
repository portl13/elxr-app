import React, { useState } from "react";
import { useGeolocation } from "react-use";
import Layout from "../components/layout/Layout";
import EventsRealShowcase from "../components/events/EventsRealShowcase";
import GeoPositionProvider from "../context/GeoPositionContext";
import Head from "next/head";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const InPersonEvents = () => {
  const [eventLoader, setEventLoader] = useState(false);
  const { loading, longitude, latitude } = useGeolocation();
  console.log(state);
  return (
    <GeoPositionProvider>
      <Layout>
        <Head>
          <title>PORTL | Channel</title>
        </Head>

        {!loading ? (
          <EventsRealShowcase
            latitude={latitude}
            longitude={longitude}
            eventLoader={eventLoader}
          />
        ) : (
          <SpinnerLoader />
        )}
      </Layout>
    </GeoPositionProvider>
  );
};

export default InPersonEvents;
