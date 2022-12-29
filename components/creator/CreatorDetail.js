import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getCreator } from "@request/creator";
import CreatorProfile from "./CreatorProfile";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import CreatorUser from "./CreatorUser";
import { genericFetch } from "@request/dashboard";

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`;

function CreatorDetail({ creator_id, token = null }) {
  const url = creatorData + creator_id
  const { user } = useContext(UserContext);
  const { data: creator } = useSWR(
    token ? [url, token] : url,
    token ? genericFetch : getCreator
  );
  return (
    <>
      <Meta />
      <Head>
        <title>CREATOR DETAILS</title>
      </Head>
      <CreatorProfile creator={creator} />
      <CreatorUser creator_id={creator_id} user={user} creator={creator} />
    </>
  );
}

export default CreatorDetail;
