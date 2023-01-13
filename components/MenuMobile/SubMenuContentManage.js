import React from 'react';
import {ROUTER_MANAGER_CONTENT} from "@utils/constant";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";

function SubMenuContentManage() {
    return ROUTER_MANAGER_CONTENT.map((item) => (
        <MenuMobileItem key={item.id} item={item} />
    ));
}

export default SubMenuContentManage;