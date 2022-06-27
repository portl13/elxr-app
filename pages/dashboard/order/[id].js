import React, { useContext } from 'react'
import Meta from '@components/layout/Meta'
import { UserContext } from '@context/UserContext'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { getOrderById } from '@request/dashboard'
import { getFormatedDateFromDate } from '@utils/dateFromat'

const orderUrl = `${process.env.apiURl}/orders-details/`
const customerUrl = `${process.env.woocomApi}/customers`

function OrderDetail({ data }) {
  const { id } = data
  const { user } = useContext(UserContext)
  const { token = null } = user?.token ? user : {}

  const { data: order } = useSWR(
    token ? [`${orderUrl}${id}`, token] : null,
    getOrderById
  )

  return (
    <div>
      <Meta />
      <Head>
        <title>Order Detail</title>
      </Head>
      <div className="container  px-3 px-md-5 pt-5">
        <div className="d-flex align-items-center">
          <Link href={'/dashboard/orders'}>
            <a className="text-white">
              <span className="contain-icon">
                <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
              </span>
              <span className="back">Back</span>
            </a>
          </Link>
        </div>
        <div className="container container-80">
          <div>
            <h3 className="mb-3 mt-3">
              Order ID <span className="text-primary">#{id}</span>
            </h3>
            <span>
              Order Date -{' '}
              {order &&
                getFormatedDateFromDate(order?.date_completed, 'MM-dd-yyyy')}
            </span>
          </div>
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="d-flex justify-content-around mb-1 mt-4 table-responsive-row px-3">
                <div className='order_detail_name'>
                  <span>Product Name</span>
                </div>
                <div className='order_detail_item'>
                  <span>Qty</span>
                </div>
                <div className='order_detail_item'>
                  <span>Price</span>
                </div>
                <div className='order_detail_item'>
                  <span>Total Amount</span>
                </div>
              </div>
              <div className="border-white px-md-0">
                {order?.line_items.map((item) => (
                  <div key={item.id} className="table-responsive-row px-3 py-2 border-bottom d-flex justify-content-between">
                    <div className="d-flex  align-items-center order_detail_name">
                      <div className="imag mr-2">
                        <img src={item.image_url} />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    <div className="order_detail_item d-flex justify-content-center align-items-center">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="order_detail_item d-flex justify-content-center align-items-center">
                      <span>${item.total}</span>
                    </div>
                    <div className="order_detail_item d-flex justify-content-center align-items-center">
                      <span>${item.subtotal}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-white mt-2 px-md-0">
                <div className="table-responsive-row px-3 py-2 border-botto ">
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${order && order.total}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Admin Fee:</span>
                    <span>${order && order.total}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <h5>Gross Total:</h5>
                    <h5>${order && order.total}</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div>
                <h3>Client Details</h3>
              </div>
              <div className="border-white d-flex  mt-2">
                <div className="imag-circular mr-2 rounded-circle">
                  {order && order.customer.avatar && (
                    <img src={order.customer.avatar} />
                  )}
                </div>
                <div className="d-flex flex-column">
                  <div>
                    <h5 className="m-0">
                      {order && order.customer.display_name}
                    </h5>
                  </div>
                  <div className="d-flex flex-column">
                    <p className="m-0 font-size-12">
                      {order && order.billing.email}
                    </p>
                    <span className="m-0 font-size-12">
                      {order && order.billing.phone}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3>Billing Details</h3>
              </div>
              <div className="border-white d-flex  mt-2">
                <div className="border-botto w-100">
                  <div className="d-flex justify-content-start pb-3">
                    <span className="pr-2">Stret:</span>
                    <span className="">{order && order.billing.address_1}</span>
                  </div>
                  <div className="d-flex justify-content-start pb-3">
                    <span className="pr-2">City:</span>
                    <span className="">{order && order.billing.city}</span>
                  </div>
                  <div className="d-flex justify-content-start pb-3">
                    <span className="pr-2">Province:</span>
                    <span className="">{order && order.billing.state}</span>
                  </div>
                  <div className="d-flex justify-content-start pb-3">
                    <span className="pr-2">Zip code:</span>
                    <span className="">{order && order.billing.postcode}</span>
                  </div>
                  <div className="d-flex justify-content-start">
                    <span className="pr-2">Country:</span>
                    <span className="">United States</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail

export async function getServerSideProps({ query }) {
  const { id } = query
  return {
    props: { data: { id } },
  }
}
