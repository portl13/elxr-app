import React, {useContext} from 'react';
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import Branding from "@components/dashboard/my-store/Branding";
import {UserContext} from "@context/UserContext";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

function BrandingPage() {
    const { user } = useContext(UserContext)
    return (
        <MainLayout title={"Branding"} sidebar={<MainSidebar />}>
            <BackButton />
            <div className="my-5">
                <ListNavItem
                    data={{
                        type: 'heading',
                        title: 'Branding',
                        icon: '/img/icon-movil/manage-menu/branding-icon.svg'
                    }}
                />
            </div>
            {user && <Branding user={user} />}
        </MainLayout>
    );
}

export default BrandingPage;