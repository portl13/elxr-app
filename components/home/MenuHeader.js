import React, { useState, useEffect } from "react";
import { css } from "@emotion/core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { stringToSlug } from "@lib/stringToSlug";
import Notification from "../layout/Notification";
import { useRouter } from "next/router";
import Cart from "@components/shared/button/Cart";

const headerStyle = css`
  margin-bottom: 0;
  @media (min-width: 992px) {
    background-color: var(--bg-buttons-bar);
    border: 1px solid #26273b;
  }
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
    padding: 8px;
  }
  &.menu-container {
    display: flex;
    align-items: center;
    @media (min-width: 99px) {
      border-radius: 30px;
      margin-top: 10px;
    }
  }
`;

const MenuHeader = ({ user }) => {
  const router = useRouter();
  return (
    <>
      <ul css={headerStyle} className="menu-container text-center">
        {user && user.rol === "vendor" ? (
          <li className="header-menu-item d-none d-md-flex">
            <Link href="/studio">
              <a
                className={`btn-icon-header ${
                  router.asPath === "/studio" ? "active" : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="text-icon-header-icon text-icon-header center-absolute"
                />
              </a>
            </Link>
          </li>
        ) : null}

        <li className="header-menu-item d-none d-md-flex">
          <Link href="/livefeed">
            <a
              className={`btn-icon-header ${
                router.asPath === "/livefeed" ? "active" : ""
              }`}
            >
              <img
                src="/img/icons/right-header/activity.png"
                className="text-icon-header-icon text-icon-header center-absolute"
                alt="activity"
              />
            </a>
          </Link>
        </li>
        <Cart />
        <li className="header-menu-item d-none d-md-flex">
          <Link
            href={
              user
                ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}`
                : ""
            }
          >
            <a
              className={`btn-icon-header ${
                router.asPath.includes("messages") ? "active" : ""
              }`}
            >
              <img
                src="/img/icons/right-header/inbox.png"
                className="text-icon-header-icon text-icon-header center-absolute"
                alt={"inbox"}
              />
            </a>
          </Link>
        </li>
        <li className="header-menu-item d-none d-md-flex">
          <Link href="/notifications">
            <a
              className={`btn-icon-header ${
                router.asPath === "/notifications" ? "active" : ""
              }`}
            >
              <Notification
                className="text-icon-header-icon text-icon-header center-absolute"
                user={user}
              />
            </a>
          </Link>
        </li>
        <li className="ml-3 d-md-none">
          <Link
            href={
              user
                ? `/messages/compose/${stringToSlug(user?.name)}/${user?.id}`
                : ""
            }
          >
            <a className="menu-movil-icon">
              <img
                src="/img/icons/right-header/inbox.png"
                className="text-icon-header-icon text-icon-header"
                alt="messages"
              />
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
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  className="text-icon-header-icon text-icon-header studio"
                />
              </a>
            </Link>
          </li>
        ) : null}
      </ul>
    </>
  );
};

export default MenuHeader;
