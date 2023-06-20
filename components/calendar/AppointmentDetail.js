import React from 'react'
import useSWR from 'swr'
import { genericFetch } from '@request/creator'
import AppointmentProduct from '@components/calendar/AppointmentProduct'
import SpinnerLoader from '@components/shared/loader/SpinnerLoader'
import PageError404 from '@components/errors/404'

const baseApi =
  process.env.baseUrl + '/wp-json/appointment/v1/appointment/product'

function AppointmentDetail({ id, serverData }) {
  const {
    data: product,
    isLoading,
    error,
  } = useSWR(`${baseApi}/${id}`, genericFetch, {
    revalidateOnFocus: false,
  })

  return (
    <>
      {isLoading && <SpinnerLoader />}
      {product && <AppointmentProduct id={id} product={product} />}
      {error?.request?.status === 404 && <PageError404 />}
    </>
  )
}

export default AppointmentDetail
