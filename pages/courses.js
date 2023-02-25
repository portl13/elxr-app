import MainLayout from "@components/main/MainLayout";
import PageCourses from "@components/main/pages/PageCourses";
import React from "react";

function CoursesPage() {
  return (
    <MainLayout title="Courses">
      <PageCourses />
    </MainLayout>
  );
}

export default CoursesPage;
