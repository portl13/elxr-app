import React from 'react';
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import ManageProducts from "@components/manage/section/ManageProducts";
import BackButton from "@components/shared/button/BackButton";

function ProductsPage() {
    return (
        <MainLayout title="Products" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageProducts />
        </MainLayout>
    );
}

export default ProductsPage;