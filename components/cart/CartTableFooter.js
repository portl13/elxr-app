import React from 'react'
import Link from 'next/link'

function CartTableFooter({ total, hasItems, isOrder = false }) {
  if (!hasItems) {
    return ''
  }

  return (
    <div className="cart-table-footer">
      <div className="cart-table-footer-row">
        <div className="cart-table-footer-item text-primary">SUBTOTAL</div>
        <div className="cart-table-footer-item text-primary">${total}</div>
      </div>
      <div className="cart-table-footer-row">
        <div className="cart-table-footer-item text-primary">TOTAL</div>
        <div className="cart-table-footer-item text-primary">${total}</div>
      </div>
      {!isOrder && (
        <div className="cart-table-footer-row">
          <div className="cart-table-footer-item text-primary py-5">
            <Link href="/page-checkout">
              <a className="btn btn-primary radius-25">Proceed to checkout</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartTableFooter
