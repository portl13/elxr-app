import React from "react";
import {
  faHome, faPlusCircle,
  faTv,
  faUsers,
  faWaveSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/core";
import DiscoverIcon from "@icons/DiscoverIcon";
import FeedIcon from "@icons/FeedIcon";
import {faCompass, faUserCircle} from "@fortawesome/free-regular-svg-icons";
import SaveIcon from "@icons/SaveIcon";

const mobileFooterStyle = css`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #0E0F11;
  position: fixed;
  bottom: 0;
  list-style: none;
  padding-left: 0;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
  margin-bottom: 0;
  min-height: 65px;
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
      color: #99A4DF;
    }
  }
  .nav-link {
    padding: 0;
    font-size: 10px;
    letter-spacing: .5px;
  }
  .nav-item {
    height: 45px;
  }
  .nav-item.active .nav-link,
  .nav-item.active .nav-icon svg,
  .nav-item.active .st0 {
    color: var(--primary-color);
    fill: var(--primary-color);
  }
`;

const routers = [
  {
    name: "Discover",
    link: "/",
    icon: <FontAwesomeIcon icon={faCompass} />,
  },
  {
    name: "Feed",
    link: "/livefeed",
    icon: <FeedIcon />,
  },
  {
    name: "Studio",
    link: "/studio",
    icon: <FontAwesomeIcon icon={ faPlusCircle } /> ,
  },
  {
    name: "Saved",
    link: "/saved",
    icon: <SaveIcon />,
  },
  {
    name: "Me",
    link: "/me",
    icon: <FontAwesomeIcon icon={faUserCircle} /> ,
  },
];

const Icon = ({ route }) => {
  if (typeof route.icon === "object" && route.icon !== null) {
    return <FontAwesomeIcon icon={route.icon} />;
  }
  return <img className="custom-icon" src={route.icon} />;
};

function MenuFooterMobile() {
  const router = useRouter();

  return (
    <ul className="menu-footer" css={mobileFooterStyle}>
      {routers.map((route) => (
        <li
          key={route.link}
          className={`nav-item ${router.route === route.link ? "active" : ""}`}
        >
          <Link href={`${route.link}`}>
            <a className="nav-link">
              <div className="nav-icon">
                {route.icon}
              </div>
              <div>{route.name}</div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MenuFooterMobile;
