import React from 'react'
import MainLayout from '@components/main/MainLayout'
import AppointmentDetail from '@components/calendar/AppointmentDetail'
import { getDataSever } from '@request/shared'

const baseApi =
  process.env.baseUrl + '/wp-json/appointment/v1/appointment/product'

function AppointmentDetailPage({ id, product }) {
  return (
    <>
      <MainLayout branding={product?.branding} title={'Appointment'}>
        <AppointmentDetail serverData={product} id={id} />
      </MainLayout>
    </>
  )
}

export default AppointmentDetailPage

export async function getServerSideProps({ query, req }) {
  const { id } = query
  let product
  try {
    product = await getDataSever(`${baseApi}/${id}`, req)
  } catch (e) {
    console.log(e)
  }
  return {
    props: { id, product },
  }
}
