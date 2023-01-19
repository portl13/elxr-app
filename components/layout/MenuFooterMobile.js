import React, { useEffect, useState } from "react";
import { faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/core";
import FeedIcon from "@icons/FeedIcon";
import { faCompass, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import SaveIcon from "@icons/SaveIcon";
import StatisticsIcon from "@icons/StatisticsIcon";
import PaletteIcon from "@icons/PaletteIcon";
import StudioIconFooter from "@icons/StudioIconFooter";
import ThemeMenu from "@components/main/menus/ThemeMenu";

const mobileFooterStyle = css`
  display: grid;
  background-color: #0e0f11;
  position: fixed;
  bottom: 0;
  list-style: none;
  padding-left: 0;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 0;
  min-height: 55px;
  z-index: 999;
  @media (min-width: 1200px) {
    display: none;
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }
  .nav-icon {
    svg,
    .custom-icon {
      width: 25px;
      height: 25px;
      color: var(--typo);
    }
  }
  .nav-link {
    padding: 0;
    font-size: 10px;
    letter-spacing: 0.5px;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
  &.grid-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  &.grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  .highlight-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 55px;
    width: 55px;
    margin: auto;
    background: linear-gradient(
      131.6deg,
      #7d0bb3 -26.76%,
      #4e2caf 24.4%,
      #a70811 76.49%
    );
    border-radius: 50%;
    position: absolute;
    right: 50%;
    top: 0;
    transform: translateY(-50%) translateX(50%);
    svg {
      color: var(--white-color) !important;
      fill: var(--white-color) !important;
    }
  }
`;

function MenuFooterMobile({ user }) {
  const router = useRouter();
  const [openThemeMenu, setOpenThemeMenu] = useState(false);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (user && user.rol === "vendor") {
      setIsVendor(true);
    }
  }, [user]);

  return (
    <ul
      className={`menu-footer ${isVendor ? "grid-5" : "grid-4"}`}
      css={mobileFooterStyle}
    >
      <li className={`nav-item ${router.route === "/" ? "active" : ""}`}>
        <Link href={`/`}>
          <a className="nav-link">
            <div className="nav-icon">
              <FontAwesomeIcon icon={faCompass} />
            </div>
          </a>
        </Link>
      </li>

      <li
        className={`nav-item ${router.route === "/livefeed" ? "active" : ""}`}
      >
        <Link href={`/livefeed`}>
          <a className="nav-link">
            <div className="nav-icon">
              <StatisticsIcon className="statistics-icon" />
            </div>
          </a>
        </Link>
      </li>

      {isVendor ? (
        <li
          className={`nav-item position-relative ${
            router.route === "/studio" ? "active" : ""
          }`}
        >
          <Link href={`/studio`}>
            <a className="nav-link highlight-icon">
              <div className="nav-icon">
                <StudioIconFooter
                  style={{ width: 30, height: 30, color: "white !important" }}
                  icon={faPlus}
                />
              </div>
            </a>
          </Link>
        </li>
      ) : null}

      <li className={`nav-item ${router.route === "/saved" ? "active" : ""}`}>
        <Link href={`/saved`}>
          <a className="nav-link">
            <div className="nav-icon">
              <SaveIcon />
            </div>
          </a>
        </Link>
      </li>

      <li className={`nav-item`}>
        <span className="nav-link">
          <div className="nav-icon">
          <ThemeMenu open={openThemeMenu} setOpen={setOpenThemeMenu} />
          </div>
        </span>
      </li>
    </ul>
  );
}

export default MenuFooterMobile;
