import React from "react";
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import AppointmentDetail from "@components/calendar/AppointmentDetail";

function AppointmentDetailPage({ id }) {
  return (
    <MainLayout sidebar={<MainSidebar />}>
      <AppointmentDetail id={id} />
    </MainLayout>
  );
}

export default AppointmentDetailPage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
