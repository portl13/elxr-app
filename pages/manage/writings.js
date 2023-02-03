import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageBlogs from "@components/manage/section/ManageBlogs";

function BlogsPage() {
  return (
    <MainLayout title="Writings" sidebar={<MainSidebar />}>
      <BackButton />
      <ManageBlogs />
    </MainLayout>
  );
}

export default BlogsPage;
