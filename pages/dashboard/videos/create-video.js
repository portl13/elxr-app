import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import VideoCreateForm from "@components/dashboard/video/VideoCreateForm";

function CreateVideo() {
    return (
        <MainLayout title="Create Video" sidebar={<MainSidebar />}>
            <VideoCreateForm />
        </MainLayout>
    );
}

export default CreateVideo;