import Layout from "../components/layout/Layout";
import { Col } from "reactstrap";
import Head from "next/head";
import WcfmChannel from "../components/wcfmChannel/WcfmChannel";

export default function ChannelsPage() {
    return (
        <Layout>
            <Head>
                <title>WeShare | Channel</title>
            </Head>
            <Col xs="12" className="bg-black bd-radius">
                <Col xs="12">
                    <h2 className="title-page">Channels</h2>
                </Col>
                <Col xs="12">
                    <WcfmChannel />
                </Col>
            </Col>
        </Layout>
    )
}
