import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import VideoCreateForm from "@components/dashboard/video/VideoCreateForm";

function EditVideo({ id }) {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Edit Video"}>
      <VideoCreateForm id={id} />
    </MainLayout>
  );
}

export default EditVideo;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
