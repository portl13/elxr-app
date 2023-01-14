import React from "react";
import { ROUTERS_PURCHASES } from "@utils/constant";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";

function SubMenuPurchases({ closeMenu }) {
  return ROUTERS_PURCHASES.map((item) => (
    <MenuMobileItem key={item.id} item={item} closeMenu={closeMenu} />
  ));
}

export default SubMenuPurchases;
