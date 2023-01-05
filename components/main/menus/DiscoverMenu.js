import React from "react";
import Link from 'next/link';
import { css } from "@emotion/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 

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
    text-align: center;
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
`
const discoverMenuOptions = [
  { label: 'Creators' },
  { label: 'Channels' },
  { label: 'Events' },
  { label: 'Videos' },
  { label: 'Podcasts' },
  { label: 'Music' },
  { label: 'Writings' },
  { label: 'Courses' },
  { label: 'Communities' },
]

function DiscoverMenu({ open, setOpen }) {

  return (
    <Dropdown
        css={dropdownStyle}
        direction="right"
        isOpen={open}
        toggle={() => setOpen(!open)}
    >
        <DropdownToggle>
            <span className="menu-title">
                Discover <FontAwesomeIcon icon={faAngleDown} />
            </span>
        </DropdownToggle>

        <DropdownMenu>
            {discoverMenuOptions.map(item => (
                <DropdownItem tag={'span'} key={item.label}>
                    <Link href="#">
                        <span className="dropdown-item-text">{item.label}</span>
                    </Link>
                </DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
  );
}

export default DiscoverMenu;
