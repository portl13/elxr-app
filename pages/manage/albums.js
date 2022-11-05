import React from 'react'
import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import BackButton from '@components/shared/button/BackButton'
import ManageSongs from '@components/manage/section/ManageSongs'
import ManageAlbums from "@components/manage/section/ManageAlbums";

function AlbumsPage() {
    return (
        <MainLayout title="Albums" sidebar={<MainSidebar />}>
            <BackButton />
            <ManageAlbums />
        </MainLayout>
    )
}

export default AlbumsPage