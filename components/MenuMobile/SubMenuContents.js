import React from "react";
import { ROUTERS_CONTENT } from "@utils/constant";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";

function SubMenuContents() {
  return ROUTERS_CONTENT.map((item) => (
    <MenuMobileItem key={item.id} item={item} />
  ));
}

export default SubMenuContents;
