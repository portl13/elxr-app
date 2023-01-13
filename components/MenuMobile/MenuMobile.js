import React, { useContext } from "react";
import { css } from "@emotion/core";
import { useRouter } from "next/router";
import { UserContext } from "@context/UserContext";
import { useMenu } from "@context/MenuContext";
import {sidebarDashStyle} from "@components/dashboard/sidebar/SidebarDashboard.style";
import Close from "@icons/Close";

export const menuMobileStyle = css`
  display: flex;
  @media screen and (min-width: 1200px) {
    display: none;
  }
  .button-mobile {
    width: 20px;
  }
  .menu-mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    opacity: 0;
    transform: translateX(-100%);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  .menu-mobile-overlay.open {
    transform: translateX(0);
    transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
    opacity: 1;
  }
  .menu-mobile {
    list-style: none;
    padding: 75px 20px;
  }
  .menu-mobile-container {
    background-color: var(--dark-color);
    max-width: 75%;
    min-height: 100vh;
  }
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: var(--dark);
  }
  .card-profile {
    padding-bottom: 15px;
  }
  .content-profile-title {
    font-size: 16px;
    margin: 0;
  }
  .close-profile {
    width: 20px;
  }
  .hr-profile {
    border: 1px solid #343434;
    width: 100%;
    margin: 0;
  }
  .item-profile {
    display: flex;
    padding: 10px 0;
    &.active h5,
    &.active svg {
      fill: var(--primary-color);
      color: var(--primary-color);
    }
  }
  .profile-icon {
    width: 20px;
    height: 20px;
    margin-right: 15px;
  }
  .profile-title-card {
    font-size: 16px;
    margin: 0;
  }
  .button-card-profile {
    border-radius: 20px;
  }
`;

function MenuMobile() {
  const router = useRouter();
  const { user, logOut } = useContext(UserContext);
  const { openMenu: open, toggleMenuMovil: setOpen } = useMenu();

  const closeOverlay = (e) => {
    if (e.target.classList.contains("menu-mobile-overlay")) {
      setOpen();
    }
  };

  const handlerRedirect = async (route) => {
    await router.push(route);
    setOpen();
  };

  const logout = () => {
    logOut()
  };

  return (
    <div
      className="align-items-center button-mobile-container"
      css={[menuMobileStyle, sidebarDashStyle]}
    >
      <div
        onClick={closeOverlay}
        className={`menu-mobile-overlay ${open ? "open" : ""}`}
      >
        <div className="menu-mobile-container px-3 py-4">
          <button onClick={setOpen} className="btn-menu d-lg-none">
            <Close className="icon-menu mb-1" />
          </button>
          <ul className="menu-mobile">

          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
