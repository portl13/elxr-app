import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ChannelCreateEvent from "@components/dashboard/channels/ChannelCreateEvent";

function CreateEvent() {
  return (
    <MainLayout title="Create Event" sidebar={<MainSidebar />}>
      <ChannelCreateEvent now={false} />
    </MainLayout>
  );
}

export default CreateEvent;
