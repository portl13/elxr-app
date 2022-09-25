import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import ManageChannels from "@components/manage/section/ManageChannels";

function ChannelsPage() {
    return (
        <MainLayout title="Channels" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageChannels />
        </MainLayout>
    );
}

export default ChannelsPage;