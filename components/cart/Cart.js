import React from 'react'
import { useCart, useCartMutation } from '@context/CartContext'
import { css } from '@emotion/core'

import CartTableFooter from '@components/cart/CartTableFooter'
import CartTableHeader from '@components/cart/CartTableHeader'
import CartTableBody from '@components/cart/CartTableBody'

export const cartStyle = css`
  padding: 3rem;
  .cart-btn-delete {
    padding: 0;
    margin: auto;
    svg {
      width: 15px;
      color: var(--white-color);
    }
  }
  .cart-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 250px;
  }
  .cart-empty-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 4px solid rgb(255, 255, 255, 0.5);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 30px;
    svg {
      fill: rgb(255, 255, 255, 0.5);
    }
  }
  .cart-empty-title {
    font-size: 22px;
  }
  .cart-separator {
    border: 0.5px solid var(--white-color);
    margin: 0 20px;
  }
  .cart-img {
    min-width: 50px;
    max-width: 50px;
    margin-right: auto;
    @media (min-width: 992px) {
      min-width: 100px;
      max-width: 100px;
      margin: auto;
    }
  }
  .cart-table {
    border: 1px solid var(--white-color);
    border-radius: 5px;
    &-body-row {
      margin-bottom: 15px;
    }
    &-header {
      display: none;
      @media (min-width: 992px) {
        display: flex;
        padding: 20px 20px 30px 20px;
      }
    }
    &-header-item {
      &.delete {
        width: 5%;
      }
      &.image {
        min-width: 100px;
      }
      &.product {
        width: calc(50% - 100px);
        flex: 1 1 auto;
      }
      &.price {
        width: 20%;
      }
      &.quantity {
        width: 15%;
      }
      &.subtotal {
        width: 15%;
      }
    }
    &-body-row {
      display: flex;
      flex-wrap: wrap;
      padding: 20px 40px;
      @media (min-width: 992px) {
        flex-wrap: nowrap;
      }
    }
    &-footer {
      padding: 3rem 0 0;
    }
    &-footer-row {
      display: flex;
      padding: 0 20px 0px 20px;
      justify-content: space-between;
      @media (min-width: 992px) {
        justify-content: end;
      }
    }
    &-footer-item {
      @media (min-width: 992px) {
        min-width: 200px;
        text-align: right;
        padding: 10px 0;
      }
    }
    &-body-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      @media (min-width: 992px) {
        width: auto;
        justify-content: center;
        align-items: center;
      }
      &.delete {
        width: 5%;
      }
      &.image {
        width: 40%;
        text-align: left;
        @media (min-width: 992px) {
          width: 100px;
        }
      }
      &.title {
        width: 50%;
        @media (min-width: 992px) {
          width: calc(50% - 100px);
          flex: 1 1 auto;
        }
      }
      &.price {
        @media (min-width: 992px) {
          width: 15%;
        }
      }
      &.quantity {
        @media (min-width: 992px) {
          width: 15%;
        }
      }
      &.subtotal {
        @media (min-width: 992px) {
          width: 15%;
          justify-content: end;
        }
      }
    }
    &-body-item::before {
      content: attr(data-label);
      @media (min-width: 992px) {
        display: none;
      }
    }
  }
`

function Cart() {
  const { items, total } = useCart()
  const { removeProduct, removeAllProduct } = useCartMutation()
  return (
    <div css={cartStyle} className="bg-black bd-radius">
      <div className="cart-table">
        <CartTableHeader hasItems={items.length > 0} />
        <CartTableBody
          hasItems={items.length > 0}
          items={items}
          removeProduct={removeProduct}
        />
        <CartTableFooter hasItems={items.length > 0} total={total} />
      </div>
    </div>
  )
}

export default Cart
