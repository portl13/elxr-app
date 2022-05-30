import Head from "next/head";
import { Col } from "reactstrap";
import Layout from "../../../components/layout/Layout";
import RealEvent from "../../../components/events/real/RealEvent";
import { getEventById } from "../../../lib/api";

export default function EventOnlineById({ data, isSaved, id }) {

  return (
    <Layout>
      <Head>
        <title>WeShare | {data.title}</title>
      </Head>
      <Col>
        <RealEvent event={data} isSaved={isSaved} id={id} />
      </Col>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const { id } = query;
  let newId = id.split("--");
  const body = {
    identifier: newId[0],
  };

  const data = await getEventById(body);

  return {
    props: {
      data,
      id,
      isSaved: newId[1] === "saved",
    },
  };
};
