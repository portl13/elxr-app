import React, { useState, useEffect } from 'react'

import RecentOrder from '@pages/my-account/RecentOrders'
import DashBoardCard from '@pages/my-account/DashBoardCard'
import DashboardShippingcard from '@pages/my-account/DashBoardShippingCard'

import { getOrder } from '@api/my-account/Order.api'
import { getAddress } from '@api/my-account/address.api'
import { getShippingAddress } from '@api/my-account/address.api'

import { css } from '@emotion/core'

export const recentOrderStyle = css`
  .recent-order-table {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 0 0 0;
  }
  .recent-head {
    display: none;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    width: 100%;
    line-height: 1.5em;
    align-items: center;
    color: #a3a5a9;
    border-bottom: 1px solid var(--white-color);
    @media (min-width: 992px) {
      display: flex;
      justify-content: space-between;
    }
  }
  .recent-head-item {
    padding: 10px 5px;
    font-size: 15px;
    @media (min-width: 992px) {
      width: calc(100% / 5);
      text-align: left;
    }
  }
  .column-head {
    display: flex;
    width: 100%;
    font-size: 13px;
    font-weight: 500;
    color: #a3a5a9;
    line-height: 1.5em;
    border-bottom: 1px solid var(--white-color);
    flex-direction: column;
    padding: 10px 0;
    @media (min-width: 992px) {
      padding: 0;
      flex-direction: row;
      align-items: center;
    }
  }
  @media (max-width: 991px) {
    .recent-col::before {
      /*
      * aria-label has no advantage, it won't be read inside a table
      content: attr(aria-label);
      */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      color: var(--white-color);
    }
  }
  .recent-col {
    width: 100%;
    display: flex;
    padding: 6px 8px;
    justify-content: space-between;
    @media (min-width: 992px) {
      width: calc(100% / 5);
      text-align: left;
    }
  }
  .actions-buttons {
    width: 124px;
    height: 27px;
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white-color);
    outline: 0;
    margin: 9px 0;
  }
  .left-content {
    width: 100%;
    display: flex;
    padding: 0 10px 0 0;
    flex-direction: column;
    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .right-content {
    width: 100%;
    display: flex;
    padding: 0 0 0 10px;
    flex-direction: column;
    @media (min-width: 992px) {
      width: 50%;
    }
  }
  .wc-MyAccount-inner-content{
    flex-wrap: wrap;
  }
`

function Dashboard({ user, handleRedirect, signOut }) {
  const [load, setLoad] = useState(false)
  const [result, setResult] = useState()
  const [page, setPage] = useState(1)
  const [per_page, setPerpage] = useState(10)
  const [address, setAddress] = useState()
  const [shippingAdress, setShippingAddress] = useState()
  useEffect(() => {
    getOrderDetail()
    getAddressDetail()
  }, [])

  function getOrderDetail() {
    getOrder(user, page, per_page)
      .then((res) => {
        setResult(res.data.data)
        setLoad(true)
      })
      .catch((error) => console.log(error))
  }

  function getAddressDetail() {
    getAddress(user)
      .then((res) => setAddress(res.data.data))
      .catch((error) => console.log(error))
  }
  function getShippingAddressData() {
    getShippingAddress(user).then((res) => {
      setShippingAddress(res.data.data)
    })
  }
  useEffect(() => {
    getShippingAddressData()
  }, [])

  return (
    <div css={recentOrderStyle}>
      <h2>Hello {user?.displayName}</h2>
      <p>
        {user?.displayName} (not {user?.displayName}?{' '}
        <a className="text-primary" onClick={() => signOut()}>
          Log out
        </a>
        )
      </p>
      <p>
        From your account dashboard you can view your{' '}
        <a className="text-primary" onClick={() => handleRedirect('orders')}>
          recent orders
        </a>
        , manage your{' '}
        <a className="text-primary" onClick={() => handleRedirect('address')}>
          shipping and billing addresses
        </a>
        , and{' '}
        <a
          className="text-primary"
          onClick={() => handleRedirect('account-details')}
        >
          edit your password and account details
        </a>
        .
      </p>
      {result?.length > 0 && (
        <div className="inner-sub-heading">RECENT ORDERS</div>
      )}
      {result?.length > 0 && (
        <div className="recent-order-table">
          <div className="recent-head">
            <div className="recent-head-item">ORDER</div>
            <div className="recent-head-item">DATE</div>
            <div className="recent-head-item">STATUS</div>
            <div className="recent-head-item">TOTAL</div>
            <div className="recent-head-item">ACTIONS </div>
          </div>
          {result &&
            result.map((item, index) => {
              return (
                <RecentOrder
                  orderItem={item}
                  index={index}
                  id={item.id}
                  key={item.id}
                  handleRedirect={handleRedirect}
                />
              )
            })}
        </div>
      )}

      <div className="wc-MyAccount-inner-content">
        <div className="left-content">
          <div className="wc-Address-title">
            Billing address{' '}
            <a
              onClick={() => handleRedirect('edit-address')}
              className="edit-text"
            >
              Edit
            </a>
          </div>
          {address && <DashBoardCard result={address} />}
        </div>
        <div className="right-content">
          <div className="wc-Address-title">
            SHIPPING ADDRESS{' '}
            <a
              onClick={() => handleRedirect('shipping-address')}
              className="edit-text"
            >
              Edit
            </a>
          </div>
          {shippingAdress && (
            <DashboardShippingcard shippingAdress={shippingAdress} />
          )}
        </div>
      </div>
    </div>
  )
}
export default Dashboard
