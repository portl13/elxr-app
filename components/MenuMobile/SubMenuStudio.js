import React, { useEffect } from "react";
import MenuMobileItem from "@components/MenuMobile/MenuMobileItem";
import HeaderDashboardIcon from "@icons/HeaderDashboardIcon";
import MyPageMenuIcon from "@icons/MyPageMenuIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons";

const ROUTERS_STUDIO = [
  {
    title: "Home",
    link: "/home/",
    id: "home",
    icon: <FontAwesomeIcon icon={faHome} />,
  },
  {
    title: "Dashboard",
    link: "/",
    id: "Dashboard",
    icon: <HeaderDashboardIcon />,
  },
  {
    title: "My Page",
    link: "/creator/my-page/",
    id: "my-page",
    icon: <MyPageMenuIcon />,
  },
];

function SubMenuStudio({ user, closeMenu }) {
  useEffect(() => {
    ROUTERS_STUDIO.map((item) => {
      if (user && item.id === "my-page") {
        item.link = `/professionals/my-page/${user.id}`;
      }
    });
  }, [user]);

  return ROUTERS_STUDIO.map((item) => (
    <MenuMobileItem key={item.id} item={item} closeMenu={closeMenu} />
  ));
}

export default SubMenuStudio;
