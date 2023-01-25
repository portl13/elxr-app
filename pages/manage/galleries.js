import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageGalleries from "@components/manage/section/ManageGalleries";

function Galleries() {
    return (
        <MainLayout title="Galleries" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageGalleries />
        </MainLayout>
    )
}

export default Galleries;