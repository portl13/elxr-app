import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import PodcastsCreateForm from "@components/dashboard/podcasts/PodcastsCreateForm";

function CreatePodcasts() {
    return (
        <MainLayout title="Create Podcasts" sidebar={<MainSidebar />}>
            <PodcastsCreateForm />
        </MainLayout>
    );
}

export default CreatePodcasts;