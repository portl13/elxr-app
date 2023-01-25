import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import GalleryCreateForm from "@components/dashboard/gallery/GalleryCreateForm";

function EditGallery({ id }) {
    return (
        <MainLayout title="Edit Gallery" sidebar={<MainSidebar />}>
            <GalleryCreateForm id={id} />
        </MainLayout>
    );
}

export default EditGallery;

export async function getServerSideProps({ query }) {
    const { id } = query;
    return {
        props: { id },
    };
}
