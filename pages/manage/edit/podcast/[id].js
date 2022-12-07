import React from "react";
import PodcastsCreateForm from "@components/dashboard/podcasts/PodcastsCreateForm";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function EditPodcasts({ id }) {
    return (
        <MainLayout title="Edit Podcasts" sidebar={<MainSidebar />}>
            <PodcastsCreateForm id={id} />
        </MainLayout>
    );
}

export default EditPodcasts;

export async function getServerSideProps({ query }) {
    const { id } = query;
    return {
        props: { id },
    };
}
