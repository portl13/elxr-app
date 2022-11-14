import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MyDownloads from "@components/my-purchases/downloads/MyDownloads";

function DownloadsPage() {
  return (
    <MainLayout title={"My Downloads"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container mt-4">
          <MyDownloads />
      </div>
    </MainLayout>
  );
}

export default DownloadsPage;
