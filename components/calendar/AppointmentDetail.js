import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/creator";
import AppointmentProduct from "@components/calendar/AppointmentProduct";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const baseApi = process.env.baseUrl + "/wp-json/appointment/v1/appointment/product";

function AppointmentDetail({ id }) {
  const { data: product } = useSWR(`${baseApi}/${id}`,
    genericFetch
  );

  return (
    <>
      {product ? <AppointmentProduct id={id} product={product} /> : <SpinnerLoader />}
    </>
  );
}

export default AppointmentDetail;
