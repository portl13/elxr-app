import React from 'react'
import CheckoutForm from 'components/checkout/CheckoutForm'
import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Elements } from '@stripe/react-stripe-js'

const checkoutTable = css`
  .checkout-table-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .checkout-table-body {
    display: flex;
    margin-bottom: 15px;
  }
  .checkout-table-img {
    width: 65px;
  }
  .checkout-table-body-item {
    &.delete {
    }
    &.body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 17px;
      margin-right: auto;
    }
    &.price {
      display: flex;
      align-items: center;
    }
  }
  .checkout-btn-delete {
    padding: 10px;
    color: var(--white-color);
    svg {
      width: 14px;
      fill: var(--white-color);
    }
  }
  .checkout-table-content {
    padding: 20px 0;
  }
  .checkout-table-footer-content {
    display: flex;
    justify-content: space-between;
  }
`

function CheckOutPaymentForm({
  options,
  stripePromise,
  clientSecret,
  items,
  total,
  removeProduct,
}) {
  return (
    <>
      <h3 className="title-page">Your order</h3>
      <div css={checkoutTable}>
        <header className="checkout-table-header">
          <span>Product</span>
          <span>Subtotal</span>
        </header>
        <div className="checkout-table-content">
          {items.map((item) => (
            <div className="checkout-table-body" key={item.id}>
              <div className="checkout-table-body-item delete">
                <button
                  onClick={() => removeProduct(item)}
                  className="btn checkout-btn-delete"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="checkout-table-body-item ">
                {item?.image && (
                  <div className="ratio-1x1 ratio checkout-table-img">
                    <img src={item?.image} />
                  </div>
                )}
              </div>
              <div className="checkout-table-body-item body">
                <span className="text-primary">{item.name}</span>
                <span>QTY: {item.quantity}</span>
              </div>
              <div className="checkout-table-body-item price text-primary">
                $ {item.quantity * item.price}
              </div>
            </div>
          ))}
        </div>
        <footer className="checkout-table-footer">
          <div className="checkout-table-footer-content">
            <span>Total</span>
            <span>$ {total}</span>
          </div>
        </footer>
      </div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  )
}

export default CheckOutPaymentForm
