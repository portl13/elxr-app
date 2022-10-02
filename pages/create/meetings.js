import React from 'react';
import Meetings from "@components/dashboard/meetings/Meetings";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

function MeetingsPage() {
    return (
        <MainLayout sidebar={<MainSidebar />} title={"Meetings"}>
            <Meetings />
        </MainLayout>
    );
}

export default MeetingsPage;