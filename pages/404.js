import PageError404 from '@components/errors/404'
import MainLayout from '@components/main/MainLayout'
import React from 'react'

function Page404() {
  return (
    <MainLayout title={'page not found'}>
      <PageError404 />
    </MainLayout>
  )
}

export default Page404
