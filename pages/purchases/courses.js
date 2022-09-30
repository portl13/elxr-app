import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

function CoursesPage() {
  return (
    <MainLayout title={"Courses"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80"></div>
    </MainLayout>
  );
}

export default CoursesPage;
