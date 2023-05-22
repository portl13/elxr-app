import React, { useContext } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { css } from "@emotion/core"
import { UserContext } from "@context/UserContext"
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"
import DashboardIcon from "@icons/DashboardIcon"
import SavedIcon from "@icons/SavedIcon"
import WalletIcon from "@icons/WalletIcon"
import PurchasesIcon from "@icons/PurchasesIcon"
import FindPeopleIcon from "@icons/FindPeopleIcon"
import SettingIcon from "@icons/SettingIcon"
import LogoutIcon from "@icons/LogoutIcon"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { profileLink } from "@utils/links"

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
    background-color: #fff;
    text-align: start;
    min-width: 235px;
    border-radius: 6px;
  }
  .dropdown-item-user {
    color: var(--bg-font);
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
      106.26deg,
      rgb(0, 224, 252) -20.69%,
      rgb(255, 115, 248) 59.13%,
      rgb(245, 209, 181) 101.63%
    );
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
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
    color: var(--bg-font);
    cursor: pointer;
    display: flex;
    flex-direction: row;
    font-weight: 700;
  }
  .dropdown-item-list.active,
  .dropdown-item-list:active {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
  .dropdown-item-list:hover,
  .dropdown-item-list:focus {
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
    color: var(--bg-font);
  }
  .user-menu-path {
    path {
      fill: var(--bg-font);
    }
  }
  .user-menu-path.active,
  .user-menu-path:active {
    path {
      fill: var(--bg-font);
    }
  }
  .user-menu-path:hover,
  .user-menu-path:focus {
    path {
      fill: var(--bg-font);
    }
  }
  .user-menu-g {
    g {
      stroke: var(--bg-font);
    }
  }
  .user-menu-g.active,
  .user-menu-g:active {
    g {
      stroke: var(--header-menu-active-text);
    }
  }
  .user-menu-g:hover,
  .user-menu-g:focus {
    g {
      stroke: var(--header-menu-active-text);
    }
  }
`

const routers = [
  {
    link: "/",
    title: "Dashboard",
    icon: <DashboardIcon className="user-menu-svg" />,
    id: "studio",
    authorization: "creator",
    show: false,
    iconNeedFill: false,
  },
  {
    link: "/saved",
    title: "Saved",
    icon: <SavedIcon className="user-menu-svg" />,
    id: "saved",
    authorization: "all",
    show: true,
    iconNeedFill: true,
  },
  // {
  //   link: "/wallet",
  //   title: "Wallet",
  //   icon: <WalletIcon className="user-menu-svg" />,
  //   id: "wallet",
  //   authorization: "all",
  //   show: true,
  //   iconNeedFill: true,
  // },
  {
    link: "/purchases",
    title: "Purchases",
    icon: <PurchasesIcon className="user-menu-svg" />,
    id: "purchases",
    authorization: "all",
    show: true,
    iconNeedFill: true,
  },
  {
    link: "/members",
    title: "Find People",
    icon: <FindPeopleIcon className="user-menu-svg" />,
    id: "members",
    authorization: "all",
    show: true,
    iconNeedFill: true,
  },
  {
    link: "/settings",
    title: "Settings",
    icon: <SettingIcon className="user-menu-svg" />,
    id: "settings",
    authorization: "all",
    show: true,
    iconNeedStroke: true,
  },
  {
    link: "/send-invitations",
    title: "Send Invitations",
    icon: <FontAwesomeIcon className="user-menu-svg" icon={faEnvelope} />,
    id: "invitations",
    authorization: "all",
    show: true,
    iconNeedStroke: true,
  },
]

function UserMenu({ open, setOpen, avatar }) {
  const { user, logOut, isNew } = useContext(UserContext)
  const router = useRouter()
  const logout = async () => {
    await logOut()
  }
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
            backgroundImage: `url(${avatar?.thumb})`,
          }}
          className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
        ></div>
      </DropdownToggle>

      <DropdownMenu>
        <DropdownItem tag={"div"} className="dropdown-item-user px-0">
          <div className="row w-100 mx-0 my-0">
            <div className="col-3 pr-0">
              <div
                style={{
                  backgroundImage: `url(${avatar?.thumb})`,
                }}
                className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
              ></div>
            </div>
            <div className="col-9 user-menu-info">
              <span className="font-weight-bold">{user?.name}</span>
              <span>{user?.email}</span>
              {user?.rol === "vendor" || isNew ? (
                <Link href={user ? `/creator/my-page/${user.id}` : "/"}>
                  <a>
                    <button className="user-menu-btn mt-2">View Page</button>
                  </a>
                </Link>
              ) : (
                <Link
                  href={user ? profileLink(user.display_name, user.id) : "/"}
                >
                  <a>
                    <button className="user-menu-btn mt-2">View Profile</button>
                  </a>
                </Link>
              )}
            </div>
          </div>
        </DropdownItem>

        <DropdownItem divider className="m-0" />

        {routers.map((item) => (
          <Link href={item.link} key={item.id}>
            <DropdownItem
              tag={"div"}
              className={`dropdown-item-list 
                ${item?.iconNeedFill ? "user-menu-path" : ""} 
                ${item?.iconNeedStroke ? "user-menu-g" : ""}
                ${router.asPath === item.link ? "active" : ""}
              `}
            >
              <div className="user-menu-icon">{item.icon}</div>
              <span>{item.title}</span>
            </DropdownItem>
          </Link>
        ))}

        <DropdownItem
          onClick={logout}
          tag={"button"}
          className={`dropdown-item-list user-menu-path`}
        >
          <div className="user-menu-icon">
            <LogoutIcon className="user-menu-svg" />
          </div>
          <span>Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default UserMenu
