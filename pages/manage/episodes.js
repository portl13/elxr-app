import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageEpisodes from "@components/manage/section/ManageEpisodes";

function Episodes() {
    return (
        <MainLayout title="Episodes" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageEpisodes />
        </MainLayout>
    )
}

export default Episodes;