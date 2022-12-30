import React, { useEffect, useState } from "react";
import SpinnerLoader from "@components/shared/loader/SpinnerLoader";
import usePortlApi from "@hooks/usePortlApi";
import AppointmentProductCard from "@components/calendar/AppointmentProductCard";
import Pagination from "@components/shared/pagination/Pagination";
import useSWR from "swr";
import { genericFetchPublicWithHeader } from "@request/creator";
const wcfmApiURl = process.env.baseUrl + "/wp-json/portl/v1/channel/product/";

function AppointmentTab({ creator_id }) {
  const limit = 20;
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { data: products, error } = useSWR(
    `${wcfmApiURl}?id=${creator_id}&page=${page}&per_page=${limit}&type=appointment`,
    genericFetchPublicWithHeader
  );

  useEffect(() => {
    if (products) setTotalItems(products.headers["x-wp-total"]);
  }, [products]);

  const isLoading = !products && !error;

  return (
    <>
      <div className="row mt-5">
        <div className="col-12">
          <h4 className="font-size-14 text-uppercase">appointment</h4>
        </div>
        {isLoading && <SpinnerLoader />}
        {products &&
          products?.data.length > 0 &&
          products?.data.map((product) => (
            <div key={product.id} className="col-12 col-md-6 col-lg-3 mb-4">
              <AppointmentProductCard product={product} />
            </div>
          ))}
        {products && products.length === 0 && (
          <h3 className="col display-4">
            You have not created any product yet
          </h3>
        )}
      </div>
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={totalItems || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  );
}

export default AppointmentTab;
