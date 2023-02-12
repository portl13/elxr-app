import React from "react";
import useSWR from "swr";
import { genericFetch } from "@request/creator";
import AppointmentProduct from "@components/calendar/AppointmentProduct";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";

const baseApi =
  process.env.baseUrl + "/wp-json/appointment/v1/appointment/product";

function AppointmentDetail({ id }) {
  const { data: product, isLoading } = useSWR(`${baseApi}/${id}`, genericFetch);

  return (
    <>
      {isLoading ? (
        <SpinnerLoader />
      ) : (
        <AppointmentProduct id={id} product={product} />
      )}
    </>
  );
}

export default AppointmentDetail;
