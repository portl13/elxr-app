import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import GalleryCreateForm from "@components/dashboard/gallery/GalleryCreateForm";

function CreateAlbumsPhotos() {
  return (
    <MainLayout title="Create Gallery" sidebar={<MainSidebar />}>
      <GalleryCreateForm />
    </MainLayout>
  );
}

export default CreateAlbumsPhotos;
