import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

function CoursesPage() {
    return (
        <MainLayout title="Courses" sidebar={<MainSidebar />}>
            <BackButton />
            <div className="my-5">
                <ListNavItem
                    data={{
                        type: 'heading',
                        title: 'Courses',
                        icon: '/img/icon-movil/create-menu/courses-icon.svg'
                    }}
                />
            </div>
        </MainLayout>
    );
}

export default CoursesPage;