import React, { useContext, useEffect } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import useSWR from "swr";
import { getFetchPublic } from "@request/creator";
import Head from "next/head";
import PodcastsRelated from "./PodcastsRelated";
import SkeletonEventDetail from "@components/SkeletonLoading/events/SkeletonEventDetail";
import { UserContext } from "@context/UserContext";
import PodcastsInfo from "@components/podcasts/PodcastsInfo";
import { countView } from "@request/shared";

const podcasturl = `${process.env.apiV2}/podcasts`;

function PodcastsDetails({ id }) {
  const { user } = useContext(UserContext);
  const { data: audio, error } = useSWR(`${podcasturl}/${id}`, getFetchPublic);
  const isLoading = !audio && !error;

  useEffect(() => {
    if (id) {
      countView(id).then();
    }
  }, [id]);

  return (
    <MainLayout sidebar={<MainSidebar />}>
      <Head>
        <title>elxr | {audio?.title}</title>
      </Head>
      <article className="container-media">
        <div className="main-item">
          {isLoading ? <SkeletonEventDetail /> : null}
          {!isLoading ? <PodcastsInfo user={user} audio={audio} /> : null}
        </div>
        <div className="relative-items mt-4 mt-md-0">
          <h4 className="text-center text-uppercase font-size-18">
            More podcasts like this
          </h4>
          {audio && <PodcastsRelated category={audio?.category_id} />}
        </div>
      </article>
    </MainLayout>
  );
}

export default PodcastsDetails;
