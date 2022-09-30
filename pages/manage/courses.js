import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageCourses from "@components/manage/section/ManageCourses";

function CoursesPage() {
    return (
        <MainLayout title="Courses" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageCourses />
        </MainLayout>
    );
}

export default CoursesPage;