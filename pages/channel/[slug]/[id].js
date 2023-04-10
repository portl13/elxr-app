import React from "react";
import ChannelDetail from "@components/main/details/channel/ChannelDetail";
import { genericFetch } from "@request/creator";

const baseUrl = process.env.apiV2;
const url = `${baseUrl}/channels/`;

function PageChannelDetail({ id, channel }) {
  return <ChannelDetail channel={channel} id={id} />;
}

export default PageChannelDetail;

export async function getServerSideProps({ query }) {
  const { id } = query;
  let channel = "";
  try {
    channel = await genericFetch(url + id);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { id, channel },
  };
}
