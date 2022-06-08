import React, { useEffect, useState } from 'react'
import WithDraw from '@components/my-wallet/WithDraw'
import ApproveRequest from '@components/my-wallet/ApproveRequest'
import CancelRequest from '@components/my-wallet/CancelRequest'
import PaymentSetting from '@components/my-wallet/PaymentSetting'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
import { css } from '@emotion/core'
import { useRouter } from 'next/router'

const withdrawlStyle = css`
  .withdraw-wrapper-div {
    width: 100%;
    display: flex;
    border-radius: 4px;
    flex-direction: column;
  }
  .withdraw-wrapper-div-container {
    width: 100%;
    display: none;
    list-style: none;
    margin: 0;
    padding: 0;
    @media (min-width: 992px) {
      display: flex;
    }
  }
  .withdraw-item {
    padding: 7px 10px;
    width: auto;
    display: flex;
    border: 1px solid var(--white-color);
    background: var(--dark-color);
    color: var(--typo);
    border-radius: 4px 4px 0 0;
    margin: 0 5px -1px 0;
    cursor: pointer;
    &:hover {
      border: 1px solid var(--primary-color);
      background: var(--dark-color);
      color: var(--primary-color);
    }
    &.active {
      border: 1px solid var(--primary-color);
      background: var(--dark-color);
      color: var(--primary-color);
    }
  }
  .view-wrapper-panel {
    width: 100%;
    display: flex;
    border: 1px solid #e7e9ec;
    border-radius: 0 3px 3px 3px;
    padding: 20px 20px;
    flex-direction: column;
  }
  .col-panel {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .col-12-tag {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0 0 15px 0;
      button {
        width: 150px;
        height: 40px;
        display: flex;
        background-color: var(--primary-color);
        border-radius: 100px;
        border: 1px solid var(--primary-color);
        outline: 0;
        font-size: 14px;
        color: #ffffff;
        align-items: center;
        justify-content: center;
        font-weight: 400;
      }
      label {
        font-size: 14px;
        color: var(--typo);
      }
      input {
        background-color: var(--dark-color);
        border: 1px solid var(--white-color);
        width: 100%;
        height: 40px;
        color: var(--typo);
        font-size: 14px;
        outline: 0;
        border-radius: 3px;
        padding: 0 12px;
        &:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 1px var(--primary-color);
          outline: 2px solid transparent;
        }
      }
    }
  }
  .woocommerce-error {
    background: #ef3e46;
    padding: 10px 15px;
    color: var(--white-color);
    border: 0;
    border-radius: 4px;
    border: 1px solid #ef3e46;
    font-size: 16px;
    width: 100%;
    display: flex;
    margin: 0 0 20px 0;
    a {
      color: var(--white-color);
    }
  }
  .browser-tag {
    width: auto;
    height: 32px;
    display: flex;
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: var(--typo);
    justify-content: center;
    align-items: center;
    line-height: 1.3;
    font-size: 14px;
    border-radius: 100px;
    outline: 0;
    padding: 0 15px;
  }
  .wc-subscription-info {
    @media (max-width: 991px) {
      flex-direction: column;
    }
  }
  .wc-subscription-info-tag {
    font-size: 14px;
    margin-bottom: 10px;

    @media (min-width: 992px) {
      font-size: 16px;
      margin-bottom: 0;
    }
  }
  .woocommerce-error-tag {
    font-size: 14px;

    @media (min-width: 992px) {
      font-size: 16px;
    }
  }
`

function WalletWithdrawl() {
  const router = useRouter()
  const { query } = router
  const { nav = null } = query
  const [status, setStatus] = useState('withdraw')

  const handleRedirect = (nav) => {
    router.push(`/my-wallet?tab=wallet-withdrawl&nav=${nav}`)
    setStatus(nav)
  }

  useEffect(() => {
    if (nav) setStatus(nav)
  }, [nav])

  return (
    <div css={withdrawlStyle} className="wallet-data-wrapper">
      <div className="wc-subscription-info">
        <FontAwesomeIcon icon={faClipboard} />
        <span className="wc-subscription-info-tag">
          Current wallet balance: $30.39
        </span>
        <button className="browser-tag">Add payment method</button>
      </div>
      <div className="withdraw-wrapper-div">
        <ul className="withdraw-wrapper-div-container">
          <li
            className={`withdraw-item ${status === 'withdraw' ? 'active' : ''}`}
            onClick={() => {
              handleRedirect('withdraw')
            }}
          >
            Withdraw Request
          </li>
          <li
            className={`withdraw-item ${status === 'approve' ? 'active' : ''}`}
            onClick={() => {
              handleRedirect('approve')
            }}
          >
            Approved Requests
          </li>
          <li
            className={`withdraw-item ${status === 'cancel' ? 'active' : ''}`}
            onClick={() => {
              handleRedirect('cancel')
            }}
          >
            Cancelled Requests
          </li>
          <li
            className={`withdraw-item ${status === 'payment' ? 'active' : ''}`}
            onClick={() => {
              handleRedirect('payment')
            }}
          >
            Payment Settings
          </li>
        </ul>
        <div className="view-wrapper-panel">
          {status === 'withdraw' && <WithDraw />}
          {status === 'approve' && <ApproveRequest />}
          {status === 'cancel' && <CancelRequest />}
          {status === 'payment' && <PaymentSetting />}
        </div>
      </div>
    </div>
  )
}
export default WalletWithdrawl
