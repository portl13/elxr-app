import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function CartRowItem({ item, removeProduct, isOrder }) {

  return (
    <>
      <hr className="cart-separator" />
      <div className="cart-table-body-row" key={item.id}>
        <div className="cart-table-body-item delete">
          {!isOrder && (
            <button
              onClick={() => removeProduct(item)}
              className="btn cart-btn-delete"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
        <div className="cart-table-body-item image">
          {item?.image && (
            <div className="ratio-1x1 ratio cart-img">
              <img src={item?.image} />
            </div>
          )}{' '}
        </div>
        <div className="cart-table-body-item title">
          <span>{item.name}</span>
        </div>
        <div className="cart-table-body-item price" data-label="PRICE">
          <span>$ {item.price}</span>
        </div>
        <div className="cart-table-body-item quantity" data-label="QUANTITY">
          <span>{item.quantity}</span>
        </div>
        <div className="cart-table-body-item subtotal" data-label="SUBTOTAL">
          <span>$ {item.quantity * item.price}</span>
        </div>
      </div>
      <hr className="cart-separator" />
    </>
  )
}

export default CartRowItem
