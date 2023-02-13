import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import CommunityList from "@components/community/CommunityList";

export default function CommunitiesDetails() {
  return (
    <MainLayout title={"Communities elxr"} sidebar={<MainSidebar />}>
      <CommunityList />
    </MainLayout>
  )
}
