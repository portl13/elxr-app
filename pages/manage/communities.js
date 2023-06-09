import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageCommunities from "@components/manage/section/ManageCommunities";

function Communities() {
  return (
    <MainLayout title="Communities" sidebar={<MainSidebar />}>
      <BackButton />
      <ManageCommunities />
    </MainLayout>
  );
}

export default Communities;
