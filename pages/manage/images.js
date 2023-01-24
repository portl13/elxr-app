import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageImages from "@components/manage/section/ManageImages";

function Images() {
    return (
        <MainLayout title="Images" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageImages />
        </MainLayout>
    )
}

export default Images;