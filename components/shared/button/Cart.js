import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import {useCart} from "@context/CartContext";

function Cart() {
  const router = useRouter();
  const {countItems} = useCart()
  return (
    <li className="header-menu-item d-none d-md-flex">
      <Link href="/cart">
        <a
          className={`btn-icon-header ${
            router.asPath === "/cart" ? "active" : ""
          }`}
        >
          {countItems > 0 && <span className="red-item-cart text-white">{countItems}</span>}
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="text-icon-header-icon text-icon-header center-absolute"
          />
        </a>
      </Link>
    </li>
  );
}

export default Cart;
