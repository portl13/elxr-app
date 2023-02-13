import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import NotificationsPage from '@components/notifications/NotificationsPage';

export default function Notifications() {

  return (
    <MainLayout title="Notifications" sidebar={<MainSidebar />}>
      <NotificationsPage />
    </MainLayout>
  );
}
