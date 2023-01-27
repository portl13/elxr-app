import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import PageChannels from "@components/main/pages/PageChannels";

export default function ChannelsPage() {
  return (
    <MainLayout title="Channels" >
      <PageChannels />
    </MainLayout>
  );
}
