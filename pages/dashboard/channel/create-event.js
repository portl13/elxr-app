import React from "react";
import MainLayout from "@components/main/MainLayout";
import ChannelCreateEvent from "@components/dashboard/channels/ChannelCreateEvent";

function CreateEvent() {
  return (
    <MainLayout title="Create Event" >
      <ChannelCreateEvent now={false} />
    </MainLayout>
  );
}

export default CreateEvent;
