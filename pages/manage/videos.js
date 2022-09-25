import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageVideo from "@components/manage/section/ManageVideo";

function VideosPage() {
    return (
        <MainLayout title="Videos" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageVideo />
        </MainLayout>
    );
}

export default VideosPage;