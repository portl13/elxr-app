import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import EpisodeDetail from "@components/podcasts/EpisodeDetail";

function PageEpisodeDetail({ id }) {
  return (
    <>
      <MainLayout title="Song Detail" sidebar={<MainSidebar />}>
        <EpisodeDetail id={id} />
      </MainLayout>
    </>
  );
}

export default PageEpisodeDetail;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
