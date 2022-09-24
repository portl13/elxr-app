import React, { useState, useEffect, useContext } from "react";
import { useCart } from "@context/CartContext";
import { css } from "@emotion/core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { stringToSlug } from "@lib/stringToSlug";
import Notification from "../layout/Notification";
import DashboardIcon from "@icons/DashboardIcon";
import { UserContext } from "@context/UserContext";
import { useRouter } from "next/router";

const headerStyle = css`
  margin-bottom: 0;
  @media (min-width: 992px) {
    background-color: #0e0f11;
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

const MenuHeader = (props) => {
  const { user, data, auth, open, setOpen } = props;
  const router = useRouter();
  const [isVendor, setIsVendor] = useState(false);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user?.roles.includes("wcfm_vendor")) {
      setIsVendor(true);
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    router.push("/");
  };

  return (
    <ul css={headerStyle} className="menu-container text-center">
      <li className="header-menu-item d-none d-md-flex">
        <Link href="/livefeed">
          <a className="btn-icon-header">
            <img
              src="/img/icons/right-header/activity.png"
              className="text-icon-header-icon text-icon-header center-absolute"
              alt="activity"
            />
          </a>
        </Link>
      </li>
      <li className="header-menu-item d-none d-md-flex">
        <Link
          href={`/messages/compose/${stringToSlug(user?.name)}/${user?.id}`}
        >
          <a className="btn-icon-header">
            <img
              src="/img/icons/right-header/inbox.png"
              className="text-icon-header-icon text-icon-header center-absolute"
            />
          </a>
        </Link>
      </li>
      <li className="header-menu-item d-none d-md-flex">
        <Link href="/notifications">
          <a className="btn-icon-header">
            <Notification
              className="text-icon-header-icon text-icon-header center-absolute"
              user={user}
            />
          </a>
        </Link>
      </li>
      <li className="header-menu-item d-none d-md-flex">
        <Link href="/studio">
          <a className="btn-icon-header">
            <DashboardIcon className="text-icon-header-icon text-icon-header center-absolute" />
          </a>
        </Link>
      </li>
      <li className="header-menu-item d-none d-md-flex">
        <button onClick={logout} className="btn-icon-header">
          <FontAwesomeIcon
            icon={faPowerOff}
            className="text-icon-header-icon text-icon-header center-absolute"
          />
        </button>
      </li>
      <li className="ml-3 d-md-none">
        <Link
          href={`/messages/compose/${stringToSlug(user?.name)}/${user?.id}`}
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
          <a className="menu-movil-icon">
            <Notification user={user} />
          </a>
        </Link>
      </li>
      <li className="ml-3 d-md-none">
        <Link href="/studio">
          <a className="menu-movil-icon">
            <DashboardIcon className="text-icon-header-icon text-icon-header studio" />
          </a>
        </Link>
      </li>
    </ul>
  );
};

export default MenuHeader;
