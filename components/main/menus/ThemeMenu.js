import React, { useContext } from "react";
import { css } from "@emotion/core";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'; 
import { ThemeContext } from '@context/ThemeContext';
import PaletteIcon from "@icons/PaletteIcon";

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
  @media (max-width: 1200px) {
    .dropdown-menu, .top{
      transform: translate3d(-119px, -174px, 0px) !important;
  }
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
  .icon-header{
    display: inline-block;
    position: relative;
  }
  .palette-icon{
    width: 20px;
  }
`

const themes = [
  {
    title: "Vivid",
    id: "vivid",
  },
  {
    title: "Night",
    id: "night",
  },
  {
    title: "Midnight",
    id: "midnigth",
  },
  {
    title: "Daylight",
    id: "daylight",
  }
];

function ThemeMenu({ open, setOpen }) {
  const { theme, changeTheme } = useContext(ThemeContext)

  const setTheme = (theme) => {
    changeTheme(theme)
  }
  
  return (
    <Dropdown
        css={dropdownStyle}
        direction="left"
        isOpen={open}
        toggle={() => setOpen(!open)}
    >
        <DropdownToggle>
            <span className={`icon-header`}>
              <PaletteIcon className='palette-icon' />
            </span>
        </DropdownToggle>

        <DropdownMenu>
            {themes.map(item => (
                <DropdownItem 
                  tag={'span'} 
                  key={item.id} 
                  className={`${theme === item.id ? "active" : ""}`}
                >
                    <span
                        onClick={() => setTheme(item.id)} 
                        className={`dropdown-item-text ${theme === item.id ? "active" : ""}`}
                    >
                        {`${item.title} ${(theme === item.id) ? '(Current)' : ''}`}
                    </span>
                </DropdownItem>
            ))}
        </DropdownMenu>
    </Dropdown>
  );
}

export default ThemeMenu;
