import React from "react";
import { useCart } from "@context/CartContext";
import CartIcon from "@icons/CartIcon";

function Cart({ className = '' }) {
  const { countItems } = useCart()

  return (
    <>
      {countItems > 0 && (<span className="red-item-cart text-white">{countItems}</span>)}
      <CartIcon className={className} />
    </>  
  );
}

export default Cart;
