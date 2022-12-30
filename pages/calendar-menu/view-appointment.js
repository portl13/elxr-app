import React from "react";
import Head from "next/head";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import Calendar from "@components/calendar/Calendar";

export default function ViewAppointmentPage() {
  return (
    <>
      <Head>
        <title>View Appointment</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <BackButton />
        <Calendar />
      </MainLayout>
    </>
  );
}
