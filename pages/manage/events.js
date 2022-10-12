import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageEvents from "@components/manage/section/ManageEvents";

function EventsPage() {
    return (
        <MainLayout title="Events" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageEvents />
        </MainLayout>
    );
}

export default EventsPage;