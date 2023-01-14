import React from "react";
import {ROUTERS_CONTENT} from "@utils/constant";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";


function SubMenuContents({ closeMenu }) {
  return ROUTERS_CONTENT.map((item) => (
    <MenuMobileItem key={item.id} item={item} closeMenu={closeMenu} />
  ));
}

export default SubMenuContents;
