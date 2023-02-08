import React from "react";
import MainLayout from "@components/main/MainLayout";
import PageChannels from "@components/main/pages/PageChannels";

export default function ChannelsPage() {
  return (
    <MainLayout title="Channels" >
      <PageChannels />
    </MainLayout>
  );
}
