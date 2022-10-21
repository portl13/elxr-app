import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManagePayout from "@components/manage/section/ManagePayout";

function Payout() {
    return (
        <MainLayout sidebar={<MainSidebar />} title={"Payout Method"}>
            <BackButton />
            <ManagePayout />
        </MainLayout>
    );
}

export default Payout;