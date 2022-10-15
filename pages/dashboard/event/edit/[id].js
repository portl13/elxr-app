import React from "react";
import EventEditForm from "@components/dashboard/events/EventEditForm";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function EventEdit({ data }) {
  const { id } = data;
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Edit Event"}>
      <EventEditForm id={id} />
    </MainLayout>
  );
}

export default EventEdit;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { data: { id } },
  };
}
