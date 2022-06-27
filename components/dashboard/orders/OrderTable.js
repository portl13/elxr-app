import React, { useState } from 'react'
import useSWR from 'swr'
import OrderRow from './OrderRow'
import { getOrders } from '@request/dashboard'
import { Spinner } from 'reactstrap'
import ReactPaginate from 'react-paginate'
import ArrowLeftIcon from '@icons/ArrowLeftIcon'
import ArrowIconRight from '@icons/ArrowIconRight'

const channelApi = process.env.baseUrl + '/wp-json/portl/v1/orders'

function OrderTable({ user, search }) {
  const limit = 20

  const [page, setPage] = useState(1)

  const { token = null } = user?.token ? user : {}

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
  )

  const isLoading = !orders && !error

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
  }

  return (
    <>
      <div className="d-flex justify-content-center justify-content-md-start mt-4 mb-5">
        <div className="p-1">
          <button className="btn btn-transparent active">
            Digital Products
          </button>
        </div>
        <div className="p-1">
          <button className="btn btn-transparent">Courses</button>
        </div>
        <div className="p-1">
          <button className="btn btn-transparent">Subscription</button>
        </div>
      </div>

      <div className="d-none d-md-flex justify-content-around table-responsive-row px-3">
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
      <div className=" border-white px-0 pb-0">
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
      {orders && (
        <ReactPaginate
          breakLabel="..."
          previousLabel={<ArrowLeftIcon />}
          nextLabel={<ArrowIconRight />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={Math.ceil(orders.total_items / limit)}
          renderOnZeroPageCount={null}
          className="pagination-page"
          pageClassName="pagination-page-item"
          previousClassName="pagination-page-item"
          nextClassName="pagination-page-item"
        />
      )}
    </>
  )
}

export default OrderTable
