import React from "react";
import Head from "next/head";
import LiveFeedCard from "../../components/livefeed/LiveFeedCard";
import { genericFetch } from "@request/creator";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import NonSsrWrapper from "../../components/no-ssr-wrapper/NonSSRWrapper";

const baseApi = process.env.bossApi + "/activity";
const url = process.env.nextSite

const typeActivity = {
  "new_blog_channel-videos": "video",
  new_blog_podcasts: "podcasts",
  new_blog_channel_events: "event",
  new_blog_blog: "blog",
  new_blog_channel: "channel",
};

const CommentWrapper = ({ activity }) => {
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>PORTL</title>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={activity.custom ? activity.secondary_item_title : `${activity.name} posted a new ${typeActivity[activity.type]}`}
        />
        <meta
          property="og:description"
          content={activity?.content_stripped}
        />
        <meta
          property="og:image"
          content={activity.custom ? activity.feature_media : activity.user_avatar.full}
        />
        <meta property="og:image:width" content="828" />
        <meta property="og:image:height" content="450" />
        <meta
          property="og:url"
          content={`${url}/activity/${activity.id}`}
        />
        <meta property="og:site_name" content="PORTL" />
      </Head>
      <div className="container mt-5">
        {activity ? (
          <NonSsrWrapper>
            <LiveFeedCard
              activity={activity}
              activityList={[activity]}
              setActivityList={() => {}}
              isComment={true}
            />
          </NonSsrWrapper>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default CommentWrapper;

export const getServerSideProps = async ({ query }) => {
  const { id = null } = query;

  const activity = await genericFetch(`${baseApi}/${id}`);

  activity.custom =
    activity.type === "new_blog_channel-videos" ||
    activity.type === "new_blog_podcasts" ||
    activity.type === "new_blog_channel_events" ||
    activity.type === "new_blog_channel" ||
    activity.type === "new_blog_blog";

  return {
    props: {
      activity,
    },
  };
};

