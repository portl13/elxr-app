import Head from "next/head";
import { Col } from "reactstrap";
import RealEvent from "@components/events/real/RealEvent";
import { getEventById } from "@lib/api";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

export default function EventOnlineById({ data, isSaved, id }) {

  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>PORTL | {data.title}</title>
      </Head>
      <Col>
        <RealEvent event={data} isSaved={isSaved} id={id} />
      </Col>
    </MainLayout>
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
