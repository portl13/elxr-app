import React from 'react'

function CartTableHeader({hasItems}) {
  if (!hasItems) {
    return ''
  }

  return (
    <div className="cart-table-header">
      <div className="cart-table-header-item delete"></div>
      <div className="cart-table-header-item image"></div>
      <div className="cart-table-header-item product text-center">PRODUCT</div>
      <div className="cart-table-header-item price text-center">PRICE</div>
      <div className="cart-table-header-item quantity text-center">
        QUANTITY
      </div>
      <div className="cart-table-header-item subtotal text-right">SUBTOTAL</div>
    </div>
  )
}

export default CartTableHeader
