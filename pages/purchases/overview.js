import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import AddressCard from "@components/my-settings/AddressCard";
import Dashboard from "@components/my-purchases/Dashboard";

function OverviewPage() {
  return (
    <MainLayout title={"Overview"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80">
        <Dashboard />
        <div className="mt-5">
          <AddressCard />
        </div>
      </div>
    </MainLayout>
  );
}

export default OverviewPage;
