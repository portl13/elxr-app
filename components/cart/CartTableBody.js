import React from 'react'
import CartRowItem from '@components/cart/CartRowItem'
import CartIcon from '/public/img/bx-cart.svg'

function CartTableBody({ items, removeProduct, hasItems, isOrder=false }) {
  if (!hasItems) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">
          <CartIcon />
        </div>
        <h2 className="cart-empty-title">Your cart is currently empty.</h2>
      </div>
    )
  }

  return (
    <div className="cart-table-body">
      {items.map((item) => (
        <CartRowItem key={item.id} item={item} isOrder={isOrder} removeProduct={removeProduct} />
      ))}
    </div>
  )
}

export default CartTableBody
