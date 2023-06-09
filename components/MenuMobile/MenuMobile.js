import React, { useContext } from "react";
import { css } from "@emotion/core";
import { UserContext } from "@context/UserContext";
import { useMenu } from "@context/MenuContext";
import { sidebarDashStyle } from "@components/dashboard/sidebar/SidebarDashboard.style";
import Close from "@icons/Close";
import SubMenuStudio from "@components/MenuMobile/SubMenuStudio";
import SubMenuPurchases from "@components/MenuMobile/SubMenuPurchases";
import SubMenuContents from "@components/MenuMobile/SubMenuContents";
import MenuMobileTitle from "@components/MenuMobile/MenuMobileTitle";
import SubMenuContentManage from "@components/MenuMobile/SubMenuContentManage";
import MenuMobileFooter from "@components/MenuMobile/MenuMobileFooter";
import Link from "next/link";
import { stringToSlug } from "@lib/stringToSlug";
import SubMenuMyPage from "@components/MenuMobile/SubMenuMyPage";
import { Scrollbars } from "react-custom-scrollbars-2";

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
    padding: 0;
  }
  .menu-mobile-container {
    background-color: var(--white-color);
    max-width: 85%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto auto 1fr;
  }
  .avatar-container {
    display: grid;
    grid-template-columns: 70px 1fr;
    column-gap: 10px;
  }
  .avatar {
    width: 70px;
    height: 70px;
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
  const { user, logOut } = useContext(UserContext);
  const { openMenu: open, toggleMenuMovil: setOpen } = useMenu();

  const closeOverlay = (e) => {
    if (e.target.classList.contains("menu-mobile-overlay")) {
      setOpen();
    }
  };

  const closeMenu = async () => {
    setOpen();
  };

  const logout = () => {
    closeMenu();
    logOut();
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
          <div className={"d-flex justify-content-end"}>
            <button onClick={setOpen} className="btn-menu d-lg-none mb-2">
              <Close className="icon-menu mb-1" />
            </button>
          </div>
          <ul className="menu-mobile">
            {user ? (
              <li className={"mb-3 avatar-container"}>
                <div className={"center-flex"}>
                  <div
                    style={{
                      backgroundImage: `url(${user?.avatar_urls?.thumb})`,
                    }}
                    className={"bg-cover avatar"}
                  ></div>
                </div>
                <div>
                  <h3 className={"font-size-20 mb-1"}>{user?.displayName}</h3>
                  <span
                    style={{ wordBreak: "break-all" }}
                    className={"d-block mb-1 text-wrap"}
                  >
                    {user?.email}
                  </span>
                  <Link
                    href={`/profile/${stringToSlug(user?.profile_name || "")}/${
                      user?.id
                    }?key=timeline&tab=personal`}
                  >
                    <a className={"section-category d-block"}>View Profile</a>
                  </Link>
                </div>
              </li>
            ) : null}
          </ul>
          <ul className="menu-mobile">
            <Scrollbars
              renderView={(props) => (
                <div {...props} className="d-flex flex-column" />
              )}
              universal
            >
              {user && user?.rol === "vendor" ? (
                <>
                  <SubMenuStudio closeMenu={closeMenu} user={user} />
                </>
              ) : null}
              {user && user?.rol !== "vendor" ? (
                <>
                  <SubMenuPurchases closeMenu={closeMenu} />
                </>
              ) : null}
              <MenuMobileTitle text={"Discover"} />
              <SubMenuContents closeMenu={closeMenu} />{" "}
              {/*{user && user?.rol === "vendor" ? (*/}
              {/*  <>*/}
              {/*    <MenuMobileTitle text={"Manage Content"} />*/}
              {/*    <SubMenuContentManage closeMenu={closeMenu} />*/}
              {/*  </>*/}
              {/*) : null}*/}
              {user && user?.rol === "vendor" ? (
                <>
                  <MenuMobileTitle text={"Manage My Page"} />
                  <SubMenuMyPage closeMenu={closeMenu} />
                </>
              ) : null}
              <MenuMobileFooter
                closeMenu={closeMenu}
                logout={logout}
                user={user}
              />
            </Scrollbars>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
