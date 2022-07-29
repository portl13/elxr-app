import React from 'react'
import moment from 'moment'
import Link from 'next/link'

function Ordersview({ orderItem, id }) {
  return (
    <div className="column-head">
      <div className="recent-col" data-label="ORDER">
        <span>#{orderItem?.id}</span>
      </div>
      <div className="recent-col" data-label="DATE">
        <span>{moment(orderItem?.date).format('MMMM DD, YYYY')}</span>
      </div>
      <div className="recent-col" data-label="STATUS">
        <span>
          {orderItem?.status.charAt(0).toUpperCase() +
            orderItem?.status.slice(1)}
        </span>
      </div>
      <div className="recent-col" data-label="TOTAL">
        <span>
          ${orderItem?.total} for {orderItem?.quantity} item
        </span>
      </div>
      <div className="recent-col actions" data-label="ACTIONS">
        <Link href={`/my-purchases/order/${id}`}>
          <a className="actions-buttons"> View</a>
        </Link>
      </div>
    </div>
  )
}

export default Ordersview
