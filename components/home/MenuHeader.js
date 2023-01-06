import React from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { stringToSlug } from "@lib/stringToSlug";
import Notification from "../layout/Notification";
import Cart from "@components/shared/button/Cart";
import StudioIcon from "@icons/StudioIcon";
import StatisticsIcon from "@icons/StatisticsIcon";
import HeaderInboxIcon from "@icons/HeaderInboxIcon";
import PaletteIcon from "@icons/PaletteIcon";

const headerStyle = css`
  margin-bottom: 0;
  .only-desk {
    display: none;
  }
  .menu-title {
    display: none;
  }
  @media (min-width: 1200px) {
    .only-desk {
      display: block;
    }
    .menu-title {
      display: block;
    }
  }
  .custom-icon {
    fill: var(--white-color);
    width: 23px;
    height: 23px !important;
  }
  .profile-button-avatar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .menu-title.show {
    display: block !important;
  }
  .menu-movil-icon {
    svg,
    img {
      width: 22px;
    }
    .studio {
      width: 23px;
      height: 23px;
    }
  }
  .header-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 8px;
  }
  &.menu-container {
    display: flex;
    align-items: center;
    padding: 8px 0px;
  }
  .icon-header{
    display: inline-block;
    width: 26px;
    height: 26px;
    position: relative;
  }
`;

const MenuHeader = ({ user }) => {
  const router = useRouter();

  return (
      <ul css={headerStyle} className="menu-container text-center">

        {user && user.rol === "vendor" ? (
          <li className="header-menu-item d-none d-md-flex">
            <Link href="/studio">
              <a className={`icon-header ${router.asPath === "/studio" ? "active" : ""}`}>
                <StudioIcon />
              </a>
            </Link>
          </li>
        ) : null}

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/livefeed">
            <a className={`icon-header ${router.asPath === "/livefeed" ? "active" : ""}`}>
              <StatisticsIcon />
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link href={user ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}` : ""}>
            <a className={`icon-header ${router.asPath.includes("messages") ? "active" : ""}`}>
              <HeaderInboxIcon />
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/notifications">
            <a className={`icon-header ${router.asPath === "/notifications" ? "active" : ""}`}>
              <Notification user={user} />
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/cart">
            <a className={`icon-header ${router.asPath === "/cart" ? "active" : ""}`}>
              <Cart /> 
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link href="#">
            <a className={`icon-header`}>
              <PaletteIcon />
            </a>
          </Link>
        </li>

        {/* --------------------------------------------------------------------------------------- */}

        <li className="ml-3 d-md-none">
          <Link href={user ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}`: ""}>
            <a className="menu-movil-icon">
              <HeaderInboxIcon />
            </a>
          </Link>
        </li>

        <li className="ml-3 d-md-none">
          <Link href="/notifications">
            <a className="menu-movil-icon position-relative">
              <Notification user={user} />
            </a>
          </Link>
        </li>

        {user && user.rol === "vendor" ? (
          <li className="ml-3 mr-3 d-md-none">
            <Link href="/studio">
              <a className="menu-movil-icon">
                <StudioIcon />
              </a>
            </Link>
          </li>
        ) : null}
      </ul>
  );
};

export default MenuHeader;
