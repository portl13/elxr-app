import React from 'react';
import Subcription from "@components/dashboard/subcription/Subcription";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

function SubscriptionPage() {
    return (
        <MainLayout title="Subscription" sidebar={<MainSidebar />}>
            <BackButton />
            <div className="my-5">
                <ListNavItem
                    data={{
                        type: 'heading',
                        title: 'Subscription',
                        icon: '/img/icon-movil/manage-menu/subscription-icon.svg'
                    }}
                />
            </div>
            <Subcription />
        </MainLayout>
    );
}

export default SubscriptionPage;