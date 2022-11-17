import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import { getFetchPublic } from "@request/creator";
import React, { useContext } from "react";
import useSWR from "swr";
import VideoRelated from "./VideoRelated";
import Head from "next/head";
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail";
import VideoInfo from "@components/video/VideoInfo";
import { UserContext } from "@context/UserContext";

const videourl = `${process.env.apiV2}/video`;

function VideoDetail({ id }) {
  const { user } = useContext(UserContext);
  const { data: video, error } = useSWR(`${videourl}/${id}`, getFetchPublic);
  const isLoading = !video && !error;

  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>PORTL | {video?.title}</title>
      </Head>
      <article className="container-media">
        <div className="main-item">
          {isLoading ? <SkeletonEventDetail /> : null}
          {!isLoading ? <VideoInfo user={user} video={video} /> : null}
        </div>
        <div className="relative-items mt-4 mt-md-0">
          <h4 className="text-center text-uppercase font-size-18">
            More videos like this
          </h4>
          {video && <VideoRelated category={video?.category_id} />}
        </div>
      </article>
    </MainLayout>
  );
}

export default VideoDetail;
