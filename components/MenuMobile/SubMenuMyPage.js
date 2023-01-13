import React from 'react';
import {ROUTER_STORE} from "@utils/constant";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";

function SubMenuMyPage() {
    return ROUTER_STORE.map((item) => (
        <MenuMobileItem key={item.id} item={item} />
    ));
}

export default SubMenuMyPage;