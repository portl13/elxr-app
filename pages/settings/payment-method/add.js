import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import AddPaymentMethod from "@components/my-settings/AddPaymentMethod";

function AddPaymentMethodPage() {
    return (
        <MainLayout sidebar={<MainSidebar />} title={"Payment Methods"}>
            <AddPaymentMethod />
        </MainLayout>
    );
}

export default AddPaymentMethodPage;