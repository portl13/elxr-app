import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MyCourse from "@components/course/myCourse";

function CoursesPage() {
  return (
    <MainLayout title={"Courses"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80">
          <MyCourse />
      </div>
    </MainLayout>
  );
}

export default CoursesPage;
