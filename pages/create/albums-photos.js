import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import AlbumsPhotosCreateForm from "@components/dashboard/albums-photos/AlbumsPhotosCreateForm";

function CreateAlbumsPhotos() {
  return (
    <MainLayout title="Create Gallery" sidebar={<MainSidebar />}>
      <AlbumsPhotosCreateForm />
    </MainLayout>
  );
}

export default CreateAlbumsPhotos;
