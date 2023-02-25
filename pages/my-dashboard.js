import React from "react";
import { Container } from "@material-ui/core";

import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import MyDashboard from "@components/my-dashboard/MyDashboard";
import { Journal } from "@components/suggestics/dashboard/journal/Journal";

function MyDashboardPage() {
  return (
    <MainLayout title={"Dashboard"} sidebar={<MainSidebar />}>
      <Container
        maxWidth="lg"
        className="main-inner d-flex flex-column justify-content-between"
      >
        <MyDashboard />
        <Journal header={false} />
      </Container>
    </MainLayout>
  );
}

export default MyDashboardPage;
