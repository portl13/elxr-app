import React from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
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
  .dropdown-item-text.active,
  .dropdown-item-text:active {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
  .dropdown-item-text:hover,
  .dropdown-item-text:focus {
    background-color: var(--header-menu-active-item);
    color: var(--header-menu-active-text);
  }
`

const routers = [
  {
    title: "Creators",
    link: "/creators",
    id: "creators",
  },
  {
    title: "Channels",
    link: "/channels",
    id: "channels",
  },
  {
    title: "Events",
    link: "/events",
    id: "events",
  },
  {
    title: "Videos",
    link: "/videos",
    id: "videos",
  },
  {
    title: "Podcasts",
    link: "/podcasts",
    id: "podcasts",
  },
  {
    title: "Music",
    link: "/music",
    id: "music",
  },
  {
    title: "Writings",
    link: "/blogs",
    id: "blogs",
  },
  {
    title: "Courses",
    link: "/courses",
    id: "courses",
  },
  {
    title: "Communities",
    link: "/communities",
    id: "communities",
  },
  {
    title: "Galleries",
    link: "/galleries",
    id: "galleries",
  },
];

function DiscoverMenu({ open, setOpen }) {
  const router = useRouter();
  
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
            {routers.map(item => (
                <DropdownItem 
                  tag={'span'} 
                  key={item.id} 
                  className={`${router.asPath === item.link ? "active" : ""}`}
                >
                    <Link href={item.link}>
                        <span 
                          className={`dropdown-item-text ${
                            router.asPath === item.link ? "active" : ""
                          }`}
                        >
                          {item.title}
                        </span>
                    </Link>
                </DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
  );
}

export default DiscoverMenu;
