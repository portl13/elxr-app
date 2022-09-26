import React, { useContext, useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Link from "next/link";
import { css } from "@emotion/core";
import FeedIcon from "@icons/FeedIcon";
import { faCompass, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import SaveIcon from "@icons/SaveIcon";
import { UserContext } from "@context/UserContext";

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
      color: #99a4df;
    }
  }
  .nav-link {
    padding: 0;
    font-size: 10px;
    letter-spacing: 0.5px;
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
  &.grid-5 {
    grid-template-columns: repeat(5, 1fr);
  }
  &.grid-4 {
    grid-template-columns: repeat(4, 1fr);
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
    icon: <FontAwesomeIcon icon={faPlusCircle} />,
  },
  {
    name: "Saved",
    link: "/saved",
    icon: <SaveIcon />,
  },
  {
    name: "Me",
    link: "/me",
    icon: <FontAwesomeIcon icon={faUserCircle} />,
  },
];

function MenuFooterMobile() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    if (user && user.roles && user?.roles?.includes("wcfm_vendor")) {
      setIsVendor(true);
    }
  }, [user]);

  if (!user) return "";

  return (
    <ul
      className={`menu-footer ${isVendor ? "grid-5" : "grid-4"}`}
      css={mobileFooterStyle}
    >
      <li
        key={1}
        className={`nav-item ${router.route === "/" ? "active" : ""}`}
      >
        <Link href={`/`}>
          <a className="nav-link">
            <div className="nav-icon">
              <FontAwesomeIcon icon={faCompass} />
            </div>
            <div>Discover</div>
          </a>
        </Link>
      </li>
      <li
        key={2}
        className={`nav-item ${router.route === "/livefeed" ? "active" : ""}`}
      >
        <Link href={`/livefeed`}>
          <a className="nav-link">
            <div className="nav-icon">
              <FeedIcon />
            </div>
            <div>Feed</div>
          </a>
        </Link>
      </li>
      {isVendor && (
        <li
          key={3}
          className={`nav-item ${router.route === "/studio" ? "active" : ""}`}
        >
          <Link href={`/studio`}>
            <a className="nav-link">
              <div className="nav-icon">
                <FontAwesomeIcon icon={faPlusCircle} />
              </div>
              <div>Studio</div>
            </a>
          </Link>
        </li>
      )}
      <li
        key={4}
        className={`nav-item ${router.route === "/saved" ? "active" : ""}`}
      >
        <Link href={`/saved`}>
          <a className="nav-link">
            <div className="nav-icon">
              <SaveIcon />
            </div>
            <div>Saved</div>
          </a>
        </Link>
      </li>
      <li
        key={5}
        className={`nav-item ${router.route === "/me" ? "active" : ""}`}
      >
        <Link href={`/me`}>
          <a className="nav-link">
            <div className="nav-icon">
              <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div>Me</div>
          </a>
        </Link>
      </li>
    </ul>
  );
}

export default MenuFooterMobile;
