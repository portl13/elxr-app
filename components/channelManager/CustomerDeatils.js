import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '@context/UserContext'
import {
  getCustomerDetails,
  getOrderDetails,
  getOrdersById,
} from '@api/channel.api'
import { useRouter } from 'next/router'
import CustomerOrders from './CustomerOrders'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faUserPlus,
  faMoneyBill,
  faEllipsisH,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons'
import { wcfmStyle } from '@components/my-account/Wcfm.style'

function CustomerDetails({ handleRedirect }) {
  const { user } = useContext(UserContext)
  const [customerDetails, setCustomersdetails] = useState([])
  const [orderList, setOrderdData] = useState([])
  const router = useRouter()
  const query = router.query
  const id = parseInt(query.nav)

  function CustomerDetail(customer_id) {
    getCustomerDetails(customer_id).then((res) => {
      setCustomersdetails(res.data)
    })
  }
  useEffect(() => {
    if (id) {
      CustomerDetail(id)
    }
  }, [id])
  useEffect(() => {
    if (id) {
      fetchOrderDetals(id)
    }
  }, [id])
  const fetchOrderDetals = (customer_id) => {
    getOrdersById(user, customer_id).then((res) => {
      setOrderdData(res.data.data)
    })
  }

  return (
    <section css={wcfmStyle}>
      <div className="wcfm-collapse-content">
        <div className="wcfm-top-element-container justify-between">
          <h3>
            {customerDetails?.first_name} {customerDetails?.last_name}
          </h3>
          <div className="select-tag">
            <select>
              <option>
                {customerDetails?.first_name} {customerDetails?.last_name}
              </option>
            </select>
          </div>
          <div className="right-container">
            <div className="new-tag-panel">
              <button type="button" className="btn btn-secondary">
                <FontAwesomeIcon icon={faUserPlus} />
                Add New
              </button>
            </div>
            <div className="money-bill">
              <FontAwesomeIcon icon={faUserCircle} />
              <div className="tooltip-panel">
                <em></em>
                Manage Customers
              </div>
            </div>
          </div>
        </div>
        <div className="order-amount-panel">
          <div className="box-panel">
            <div className="wcfmfa">
              <FontAwesomeIcon icon={faMoneyBill} />
            </div>
            <div className="div-section">
              <span>${customerDetails.money_spent}</span>
              <em>total money spend</em>
            </div>
          </div>
          <div className="box-panel">
            <div className="wcfmfa">
              <FontAwesomeIcon icon={faCartPlus} />
            </div>
            <div className="div-section">
              <span>{customerDetails.orders} order</span>
              <em>total order palced</em>
            </div>
          </div>
        </div>
        <div className="billing-wrapper">
          <div className="overview-section">
            <div className="overview-panel">
              <div className="left-panel">Email</div>
              <div className="right-panel">
                <div className="input-section">
                  {customerDetails?.user_email}
                </div>
              </div>
            </div>
            <div className="overview-panel">
              <div className="left-panel">First Name</div>
              <div className="right-panel">
                <div className="input-section">
                  {customerDetails?.first_name}
                </div>
              </div>
            </div>
            <div className="overview-panel">
              <div className="left-panel">Last Name</div>
              <div className="right-panel">
                <div className="input-section">
                  {customerDetails?.last_name}
                </div>
              </div>
            </div>
            <div className="overview-panel">
              <div className="left-panel">Company Name</div>
              <div className="right-panel">
                <div className="input-section">{customerDetails?.company}</div>
              </div>
            </div>
          </div>
        </div>
        <h4>
          <FontAwesomeIcon icon={faCartPlus} />
          Orders
        </h4>
        <div className="billing-wrapper">
          {/* <div className="tabbing-section">
                    <ul>
                        <li>print</li>
                        <li>pdf</li>
                        <li>excel</li>
                        <li>csv</li>
                    </ul>
                </div> */}
          <div className="wcfm-datatable">
            <div className="row-head">
              <div className="customer-detail-div-1">
                <span className="subscription-tag">
                  <FontAwesomeIcon icon={faEllipsisH} />
                  <span className="tooltip-panel">
                    Status<em></em>
                  </span>
                </span>
              </div>
              <div className="customer-detail-div-2">Order</div>
              <div className="customer-detail-div-3">Purchased</div>
              <div className="customer-detail-div-4">Gross Sales</div>
              <div className="customer-detail-div-5">Date</div>
              <div className="customer-detail-div-6">Actions</div>
            </div>
            {orderList &&
              orderList.map((item) => (
                <CustomerOrders
                  orderList={item}
                  id={item.id}
                  handleRedirect={handleRedirect}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerDetails
