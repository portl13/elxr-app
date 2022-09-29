import React, {useContext} from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import {UserContext} from "@context/UserContext";
import EditShippingAddress from "@components/my-settings/EditShippingAddress";

function ShippingAddress() {
    const { user } = useContext(UserContext)
    return (
        <MainLayout title={"Shipping Address"} sidebar={<MainSidebar />}>
            <BackButton />
            <EditShippingAddress user={user} />
        </MainLayout>
    );
}

export default ShippingAddress;