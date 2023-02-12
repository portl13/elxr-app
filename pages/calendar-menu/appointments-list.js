import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import AppointmentsList from "@components/calendar/AppointmentsList";

function AppointmentsListPage() {
  return (
    <MainLayout title="Appointments List" sidebar={<MainSidebar />}>
      <BackButton />
      <AppointmentsList />
    </MainLayout>
  );
}

export default AppointmentsListPage;
