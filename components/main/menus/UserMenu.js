import React, { useContext } from "react";
import Link from "next/link";
import { css } from "@emotion/core";
import { UserContext } from "@context/UserContext";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import DashboardIcon from "@icons/DashboardIcon";
import SavedIcon from "@icons/SavedIcon";
import PurchasesIcon from "@icons/PurchasesIcon";
import FindPeopleIcon from "@icons/FindPeopleIcon";
import SettingsIcon from "@icons/SettingsIcon";
import LogoutIcon from "@icons/LogoutIcon";

const dropdownStyle = css`
  button.btn,
  .btn-secondary:not(:disabled):not(.disabled):active {
    padding: 0;
    font-size: 12px;
    text-transform: capitalize;
    background-color: transparent;
    margin: 0;
    border: none;
    font-weight: normal;
    color: var(--typo);
    box-shadow: none;
  }
  .dropdown-menu {
    background-color: var(--bg-main-categories);
    text-align: start;
    min-width: 10rem;
    border-radius: 6px;
  }
  .dropdown-item-user {
    color: var(--typo);
    background-color: var(--bg-main-categories);
    padding: 0px 100px 0px 0px;
  }
  .header-user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-menu-info {
    display: flex;
    flex-direction: column;
  }
  .user-menu-btn {
    background: linear-gradient(
      92.39deg,
      #8d00fc -33.12%,
      #741342 106.88%,
      #4419a0 106.9%
    );
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    padding: 6px 11px;
    color: var(--typo);
    font-weight: 600;
    border: 1px solid transparent;
  }
  .user-menu-btn:focus {
    outline: none;
  }

  .dropdown-item-list {
    padding: 15px;
    color: var(--typo);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-weight: 700;

    path {
      fill: var(--typo);
    }
  }
  .dropdown-item-list:hover,
  .dropdown-item-list:focus {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);

    path {
      fill: var(--header-menu-active-text);
    }
  }

  .dropdown-item-list-2 {
    padding: 15px;
    color: var(--typo);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-weight: 700;
  }
  .dropdown-item-list-2:hover,
  .dropdown-item-list-2:focus {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }

  .user-menu-icon {
    padding-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user-menu-svg {
    width: 22px;
    height: 22px;
  }
`;
const menuOptions = [
  {
    label: "Dashboard",
    icon: <DashboardIcon className="user-menu-svg" />,
    path: "#",
    iconNeedFill: false,
  },
  {
    label: "Saved",
    icon: <SavedIcon className="user-menu-svg" />,
    path: "#",
    iconNeedFill: true,
  },
  {
    label: "Purchases",
    icon: <PurchasesIcon className="user-menu-svg" />,
    path: "#",
    iconNeedFill: true,
  },
  {
    label: "Find People",
    icon: <FindPeopleIcon className="user-menu-svg" />,
    path: "#",
    iconNeedFill: true,
  },
  {
    label: "Settings",
    icon: <SettingsIcon className="user-menu-svg" />,
    path: "#",
    iconNeedFill: false,
  },
];

function UserMenu({ open, setOpen }) {
  const { user, logOut } = useContext(UserContext);
  const logout = async () => {
    logOut();
  };
  return (
    <Dropdown
      css={dropdownStyle}
      direction="down"
      isOpen={open}
      toggle={() => setOpen(!open)}
    >
      <DropdownToggle>
        <div
          style={{
            backgroundImage: `url(${user?.avatar_urls?.thumb})`,
          }}
          className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
        ></div>
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem tag={"div"} className="dropdown-item-user">
          <div className="row w-100 mx-0 my-3">
            <div className="col-3">
              <div
                style={{
                  backgroundImage: `url(${user?.avatar_urls?.thumb})`,
                }}
                className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
              ></div>
            </div>
            <div className="col-9 user-menu-info">
              <span className="font-weight-bold">{user?.name}</span>
              <span>{user?.email}</span>
              <Link href="#">
                <a>
                  <button className="user-menu-btn mt-2">View Profile</button>
                </a>
              </Link>
            </div>
          </div>
        </DropdownItem>

        <DropdownItem divider className="m-0" />

        {menuOptions.map((item) => (
          <DropdownItem
            tag={"div"}
            key={item.label}
            className={`${
              item.iconNeedFill ? "dropdown-item-list" : "dropdown-item-list-2"
            }`}
          >
            <Link href={item.path}>
              <>
                <div className="user-menu-icon">{item.icon}</div>
                <span>{item.label}</span>
              </>
            </Link>
          </DropdownItem>
        ))}
        <DropdownItem
          onClick={logout}
          tag={"button"}
          className={`dropdown-item-list`}
        >
          <div className="user-menu-icon">
            <LogoutIcon className="user-menu-svg" />
          </div>
          <span>Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default UserMenu;
