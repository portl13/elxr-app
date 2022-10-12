import Axios from 'axios';
import Head from 'next/head';
import { Col } from 'reactstrap'
import Layout from '../../../components/layout/Layout';
import VirtualEvent from '../../../components/events/online/VitualEvent'

export default function EventOnlineBySlug({ event }) {


    return (
        <Layout>
            <Head>
                <title>PORTL | {event.title}</title>
            </Head>
            <Col>
                <VirtualEvent event={event} />
            </Col>
        </Layout>
    )
}

export const getServerSideProps = async ({ query }) => {

    const { slug } = query;

    const url = process.env.NEXT_PUBLIC_API_EVENTS_WP + `events/by-slug/${slug}`;

    const { data: event } = await Axios.get(url)

    return {
        props: {
            event
        }
    }
}
