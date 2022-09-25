import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManagePodcasts from "@components/manage/section/ManagePodcasts";

function PodcastsPage() {
    return (
        <MainLayout title="Podcasts" sidebar={<MainSidebar />}>
            <BackButton />
            <ManagePodcasts />
        </MainLayout>
    );
}

export default PodcastsPage;