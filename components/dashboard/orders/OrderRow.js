import { getFormatedDateFromDate } from '@utils/dateFromat'
import Link from 'next/link'
import React from 'react'

function OrderRow({ order }) {
  const {
    id,
    line_items,
    payment_method_title,
    date_paid,
    total,
    billing,
    customer,
  } = order
  return (
    <div className="table-responsive-row d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-4 px-3 px-md-0 border-bottom">
      <div className="pl-md-3 d-flex justify-content-between order_id">
        <span className=" d-md-none">Order ID</span>
        <p className="text-success m-0">#{id}</p>
      </div>
      <div className="client_name d-flex justify-content-between align-items-center">
        <div className="img-circle mr-1">
          <img src={customer.avatar} alt="avatar" />
        </div>
        <div>
          <p className="m-0">{customer.display_name}</p>
        </div>
      </div>
      <div className="d-flex justify-content-between justify-content-md-center items">
        <span className="d-md-none"># Items</span>
        <p className="text-success m-0">{line_items.length}</p>
      </div>
      <div className="d-flex justify-content-between billing_address">
        <span className="d-md-none">Billing Address</span>
        <p className="m-0">{billing?.address_1}</p>
      </div>
      <div className="d-flex justify-content-between justify-content-md-center puchased_date">
        <span className="d-md-none">Purchased Date</span>
        <p className="m-0">
          {getFormatedDateFromDate(date_paid, 'MM-dd-yyyy')}
        </p>
      </div>
      <div className="d-flex justify-content-between justify-content-md-center payment_method">
        <span className="d-md-none">Payment Method</span>
        <p className="m-0">
          {payment_method_title === '' && Number(total) === 0
            ? 'Free Product'
            : payment_method_title}
        </p>
      </div>
      <div className="d-flex justify-content-between justify-content-md-center total_amount">
        <span className="d-md-none">Total Amount</span>
        <p className="m-0">${total}</p>
      </div>
      <div className="pr-md-4 d-flex justify-content-between justify-content-md-end action">
        <span className="d-flex d-md-none">Action</span>
        <span>
          <Link href={`/dashboard/order/${id}`}>
            <a>View</a>
          </Link>
        </span>
      </div>
    </div>
  )
}

export default OrderRow
