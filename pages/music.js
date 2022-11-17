import MainLayout from '@components/main/MainLayout'
import MainSidebar from '@components/main/MainSidebar'
import PageAlbums from '@components/main/pages/PageAlbums'
import React from 'react'

function MusicPage() {
    return (
        <MainLayout
            sidebar={<MainSidebar />}
            title="Albums"
        >
            <PageAlbums/>
        </MainLayout>
    )
}

export default MusicPage