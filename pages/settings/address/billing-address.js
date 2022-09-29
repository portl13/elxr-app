import React, {useContext} from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import {UserContext} from "@context/UserContext";
import EditAddress from "@components/my-settings/EditAddress";

function BillingAddressPage() {
    const { user } = useContext(UserContext)
    return (
        <MainLayout sidebar={<MainSidebar />} title={"Billing Address"}>
            <BackButton />
            <EditAddress user={user} />
        </MainLayout>
    );
}

export default BillingAddressPage;