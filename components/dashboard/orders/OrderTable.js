import React, { useEffect, useState } from "react";
import useSWR from "swr";
import OrderRow from "./OrderRow";
import { getOrders } from "@request/dashboard";
import { Spinner } from "reactstrap";
import Pagination from "@components/shared/pagination/Pagination";

const channelApi = process.env.baseUrl + "/wp-json/portl/v1/orders";

function OrderTable({ user, search }) {
  const limit = 20;

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const { token = null } = user?.token ? user : {};

  const { data: orders, error } = useSWR(
    token
      ? [
          `${channelApi}?length=${limit}&start=${
            (page - 1) * limit
          }&search=${search}`,
          token,
        ]
      : null,
    getOrders
  );

  const isLoading = !orders && !error;

  useEffect(() => {
    if (orders && orders.total_items) {
      setTotal(orders.total_items);
    }
  }, [orders]);

  return (
    <>
      <div className="d-none d-md-flex justify-content-around table-responsive-row px-3 mt-5">
        <div className="table-header order_id">
          <p className="table-header-item">Order ID</p>
        </div>
        <div className="table-header client_name">
          <p className="table-header-item">Client Name</p>
        </div>
        <div className="table-header items text-center">
          <p className="table-header-item">Items</p>
        </div>
        <div className="table-header billing_address">
          <p className="table-header-item">Billing Address</p>
        </div>
        <div className="table-header puchased_date text-center">
          <p className="table-header-item">Purchased Date</p>
        </div>
        <div className="table-header payment_method d-flex justify-content-md-center">
          <p className="table-header-item">Payment Method</p>
        </div>
        <div className="table-header total_amount d-flex justify-content-md-center">
          <p className="table-header-item">Total Amount</p>
        </div>
        <div className="table-header action d-flex justify-content-md-end">
          <p className="table-header-item">Action</p>
        </div>
      </div>
      <div className="mt-4 mt-md-2 border-white font-color px-0 pb-0">
        {isLoading && (
          <div className="p-5 justify-content-center d-flex">
            <span className="text-center">
              <Spinner animation="grow" variant="primary" />
            </span>
          </div>
        )}

        {orders?.length === 0 && (
          <div className="p-5 justify-content-center d-flex">
            <h5 className="text-center text-uppercase">no orders available</h5>
          </div>
        )}

        {orders &&
          orders?.data &&
          orders.data.map((order) => <OrderRow key={order.id} order={order} />)}
      </div>

      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-end">
          <Pagination
            totalCount={total || 0}
            onPageChange={setPage}
            currentPage={page}
            pageSize={limit}
          />
        </div>
      </div>
    </>
  );
}

export default OrderTable;
