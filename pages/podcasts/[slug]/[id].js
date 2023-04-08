import React from "react";
import PodcastsDetails from "@components/podcasts/PodcastsDetails";
import { getDataSever } from "@request/shared";
const url = `${process.env.apiV2}/podcasts`;

function PodcastsDetailPage({ id, podcasts }) {
  return <PodcastsDetails audio={podcasts} id={id} />;
}

export default PodcastsDetailPage;

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  let podcasts = "";
  try {
    podcasts = await getDataSever(`${url}/${id}`, req);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { id, podcasts },
  };
}
