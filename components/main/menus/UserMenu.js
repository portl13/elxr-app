import React, { useContext } from "react";
import Link from 'next/link';
import { css } from "@emotion/core";
import { UserContext } from "@context/UserContext";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import DashboardIcon from "@icons/DashboardIcon";

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
  svg {
    width: 8px;
  }
  .dropdown-menu {
    background-color: var(--bg-main-categories);
    text-align: start;
    min-width: 10rem;
    border-radius: 6px;
  }
  .dropdown-item {
    padding: 0;
    color: var(--typo);
    cursor: pointer;
  }
  .dropdown-item.active,
  .dropdown-item:active {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
  .dropdown-item:hover,
  .dropdown-item:focus {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
  .dropdown-item-text {
    display: block;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: var(--typo);
  }
  .dropdown-item-text:hover,
  .dropdown-item-text:focus {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
  .pointer {
    cursor: pointer;
  }
  .header-user-avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .user-item{
    padding: 0px 100px 0px 0px;
  }
  .user-menu-info{
    color: var(--typo);
    display: flex;
    flex-direction: column;
  }
  .user-menu-btn{
    background: linear-gradient(92.39deg, #8D00FC -33.12%, #741342 106.88%, #4419A0 106.9%);
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    padding: 6px 11px;
    color: var(--typo);
    font-weight: 600;
    border: 1px solid transparent;
  }
`
const menuOptions = [
  { 
    label: 'Dashboard',
    icon: <DashboardIcon />,
    path: '',
  },
  { 
    label: 'Saved',
    icon: null,
    path: '',
  },
  { 
    label: 'Purchases',
    icon: null,
    path: '',
  },
  { 
    label: 'Find People',
    icon: null,
    path: '',
  },
  { 
    label: 'Settings',
    icon: null,
    path: '',
  },
  { 
    label: 'Log Out',
    icon: null,
    path: '',
  },
]

function UserMenu({ open, setOpen }) {
  const { user } = useContext(UserContext);

  return (
    <Dropdown
        css={dropdownStyle}
        direction="left"
        isOpen={open}
        toggle={() => setOpen(!open)}
    >
        <DropdownToggle>
            <div 
                style={{
                    backgroundImage: `url(${user?.avatar_urls?.thumb})`
                }}
                className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
            >
            </div>
        </DropdownToggle>

        <DropdownMenu>
            <DropdownItem tag={'div'} className='user-item'>
                <div className="row w-100 mx-0">
                    <div className="col-3">
                        <div 
                            style={{
                                backgroundImage: `url(${user?.avatar_urls?.thumb})`
                            }}
                            className="ratio ratio-16x9 bg-gray opacity-50 bg-cover header-user-avatar"
                        >
                        </div>
                    </div>
                    <div className="col-9 user-menu-info">
                        <span className="font-weight-bold">{user.name}</span>
                        <span>{user.email}</span> 
                        <Link href="#">
                            <a>
                                <button className="user-menu-btn mt-3">
                                    View Profile
                                </button>
                            </a>
                        </Link>
                    </div>
                </div>
            </DropdownItem>

            <DropdownItem divider />
        
            {menuOptions.map(item => (
                <DropdownItem tag={'span'} key={item.label}>
                    {/* <Link href={item.path}> */}
                        {item.icon}
                        <span className="dropdown-item-text">{item.label}</span>
                    {/* </Link> */}
                </DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
  );
}

export default UserMenu;
