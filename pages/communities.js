import React from "react";
import MainLayout from "@components/main/MainLayout";
import CommunityList from "@components/community/CommunityList";

function CommunitiesPage() {
  return (
    <MainLayout title="Communities">
      <CommunityList />
    </MainLayout>
  );
}

export default CommunitiesPage;
