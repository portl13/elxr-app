import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import useSWR from "swr";
import { getCreator } from "@request/creator";
import CreatorProfile from "./CreatorProfile";
import Meta from "@components/layout/Meta";
import Head from "next/head";
import CreatorUser from "./CreatorUser";
import CreatorChannels from "./CreatorChannels";
import CreatorPodcasts from "./CreatorPodcasts";
import CreatorVideos from "./CreatorVideos";
import CreatorEvents from "./CreatorEvents";
import CreatorCourses from "./CreatorCourses";

const creatorData = `${process.env.baseUrl}/wp-json/portl/v1/channel?user_id=`;
const channelUrl = `${process.env.apiV2}/channels?author=`;

function CreatorDetail({ creator_id }) {
  const { user } = useContext(UserContext);
  const token = user?.token;
  const { data: creator, error } = useSWR(creatorData + creator_id, getCreator);



  return (
    <div>
      <Meta />
      <Head>
        <title>CREATOR DETAILS</title>
      </Head>
      <CreatorProfile creator={creator} />
      <div className="container container-80">
      <CreatorUser creator={creator} />
      <CreatorChannels creator_id={creator_id} />
      <CreatorEvents creator_id={creator_id} />
      <CreatorVideos creator_id={creator_id} />
      <CreatorPodcasts creator_id={creator_id} />
      <CreatorCourses creator_id={creator_id} />
      </div>
    </div>
  );
}

export default CreatorDetail;
