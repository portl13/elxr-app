import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BlogCreateForm from "@components/dashboard/blogs/BlogCreateForm";

function CreateBlog() {
  return (
    <MainLayout title="Create Blog" sidebar={<MainSidebar />}>
      <BlogCreateForm />
    </MainLayout>
  );
}

export default CreateBlog;
