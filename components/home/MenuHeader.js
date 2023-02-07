import React, { useState } from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";
import Notification from "../layout/Notification";
import Cart from "@components/shared/button/Cart";
import StudioIcon from "@icons/StudioIcon";
import StatisticsIcon from "@icons/StatisticsIcon";
import HeaderInboxIcon from "@icons/HeaderInboxIcon";
import ThemeMenu from "@components/main/menus/ThemeMenu";
import UserMenu from "@components/main/menus/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "@context/CartContext";
import {useMenu} from "@context/MenuContext";

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
  &.menu-container {
    display: flex;
    align-items: center;
    padding: 8px 0;
    list-style: none;
  }
  .header-menu-item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
  }
  .icon-header {
    display: inline-block;
    position: relative;
  }
  .studio-icon {
    width: 24px;
  }
  .statistics-icon {
    width: 20px;
  }
  .inbox-icon {
    width: 20px;
  }
  .notification-icon {
    width: 18px;
  }
  .cart-icon {
    width: 20px;
  }
  &.menu-container.menu-container-item {
    display: grid;
    column-gap: 15px;
  }
  &.menu-container.menu-container-item.grid-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  &.menu-container.menu-container-item.grid-4 {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MenuHeader = ({ user }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [openThemeMenu, setOpenThemeMenu] = useState(false);
  const { countItems } = useCart();
  const {toggleSearch} = useMenu()
  return (
    <>
      <ul css={headerStyle} className="menu-container text-center">
        {user && user.rol === "vendor" ? (
          <li className="header-menu-item d-none d-md-flex">
            <Link href="/studio">
              <a
                className={`icon-header ${
                  router.asPath === "/studio" ? "active" : ""
                }`}
              >
                <StudioIcon className="studio-icon" />
              </a>
            </Link>
          </li>
        ) : null}

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/livefeed">
            <a
              className={`icon-header ${
                router.asPath === "/livefeed" ? "active" : ""
              }`}
            >
              <StatisticsIcon className="statistics-icon" />
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link
            href={
              user
                ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}`
                : ""
            }
          >
            <a
              className={`icon-header ${
                router.asPath.includes("messages") ? "active" : ""
              }`}
            >
              <HeaderInboxIcon className="inbox-icon" />
            </a>
          </Link>
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/notifications">
            <a
              className={`icon-header ${
                router.asPath === "/notifications" ? "active" : ""
              }`}
            >
              <Notification user={user} className="notification-icon" />
            </a>
          </Link>
        </li>

        {countItems > 0 ? (
          <li className="header-menu-item d-none d-md-flex">
            <Link href="/cart">
              <a
                className={`icon-header ${
                  router.asPath === "/cart" ? "active" : ""
                }`}
              >
                <Cart className="cart-icon text-white" />
              </a>
            </Link>
          </li>
        ) : null}

        <li className="header-menu-item d-none d-md-flex">
          <ThemeMenu open={openThemeMenu} setOpen={setOpenThemeMenu} />
        </li>

        <li className="header-menu-item d-none d-md-flex">
          <UserMenu open={open} setOpen={setOpen} />
        </li>
      </ul>

      <ul
        css={headerStyle}
        className={`menu-container text-center menu-container-item d-md-none ${
          countItems > 0 ? "grid-5" : "grid-4"
        }`}
      >
        {/* <li className="d-md-none">
          <button
              onClick={toggleSearch}
              className="menu-movil-icon btn-transparent p-0 not-hover">
            <FontAwesomeIcon
              style={{
                width: "20px !important",
              }}
              icon={faSearch}
            />
          </button>
        </li> */}

        <li className="d-md-none">
          <Link
            href={
              user
                ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}`
                : ""
            }
          >
            <a className="menu-movil-icon">
              <HeaderInboxIcon />
            </a>
          </Link>
        </li>

        <li className="d-md-none">
          <Link href="/notifications">
            <a className="menu-movil-icon position-relative">
              <Notification user={user} />
            </a>
          </Link>
        </li>

        {countItems > 0 ? (
          <li className="d-md-none">
            <Link href="/notifications">
              <a className="menu-movil-icon position-relative text-white">
                <Cart className="cart-icon" />
              </a>
            </Link>
          </li>
        ) : null}
        <li className="d-md-none">
          <Link
            href={`/me`}
          >
            <a className="menu-movil-icon position-relative d-flex justify-content-center align-items-center">
              <div
                className={"bg-cover avatar small"}
                style={{
                  backgroundImage: `url(${user?.avatar_urls?.thumb})`,
                }}
              ></div>
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default MenuHeader;
