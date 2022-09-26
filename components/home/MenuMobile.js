import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faCog,
  faInbox,
  faSignInAlt,
  faTimes,
  faTv,
  faUserFriends,
  faUsers,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";
import { UserContext } from "@context/UserContext";
import Link from "next/link";
import { getProfileRoute } from "@utils/constant";
import CartICon from "/public/img/bx-cart.svg";
import MortarBoard from "/public/img/mortarboard.svg";
import { useMenu } from "@context/MenuContext";
import DiscoverIcon from "@icons/DiscoverIcon";
import CreatorIcon from "@icons/CreatorIcon";
import ChannelIcon from "@icons/ChannelIcon";
import EventIcon from "@icons/EventIcon";
import VideosIcon from "@icons/VideosIcon";
import PodcastsIcon from "@icons/PodcastsIcon";
import BlogsIcon from "@icons/BlogsIcon";
import CourseIcon from "@icons/CourseIcon";
import CommunityIcon from "@icons/CommunityIcon";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import {sidebarDashStyle} from "@components/dashboard/sidebar/SidebarDashboard.style";

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
    z-index: 2;
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
    padding: 75px 20px;
  }
  .menu-mobile-container {
    background-color: var(--dark-color);
    max-width: 75%;
    min-height: 100vh;
  }
  .avatar {
    width: 50px;
    height: 50px;
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

const initialRouters = [
  {
    title: "Discover",
    icon: <DiscoverIcon className={"dashboard-icon"} />,
    link: "/",
    id: "discover",
    auth: false,
  },
  {
    title: "Creators",
    icon: <CreatorIcon className={"dashboard-icon"} />,
    link: "/creators",
    id: "creators",
    auth: false,
  },
  {
    title: "Channels",
    icon: <ChannelIcon />,
    link: "/channels",
    id: "channels",
    auth: false,
  },
  {
    title: "Events",
    icon: <EventIcon />,
    link: "/events",
    id: "events",
    auth: false,
  },
  {
    title: "Videos",
    icon: <VideosIcon className={"dashboard-icon"} />,
    link: "/videos",
    id: "videos",
    auth: false,
  },
  {
    title: "Podcasts",
    icon: <PodcastsIcon className={"dashboard-icon"} />,
    link: "/podcasts",
    id: "podcasts",
    auth: false,
  },
  {
    title: "Blogs",
    icon: <BlogsIcon />,
    link: "/blogs",
    id: "blogs",
    auth: false,
  },
  {
    title: "Courses",
    icon: <CourseIcon />,
    link: "/courses",
    id: "courses",
    auth: false,
  },
  {
    title: "Communities",
    icon: <CommunityIcon />,
    link: "/communities",
    id: "communities",
    auth: false,
  },
  {
    title: "Me",
    icon: <FontAwesomeIcon className="dashboard-icon" icon={faUserCircle} />,
    link: "/me",
    id: "saved",
    auth: true,
  },
];

function MenuMobile() {
  const router = useRouter();
  const { setUser, user } = useContext(UserContext);
  const [routers, setRouters] = useState(initialRouters);

  const { openMenu: open, toggleMenuMovil: setOpen } = useMenu();

  const closeOverlay = (e) => {
    if (e.target.classList.contains("menu-mobile-overlay")) {
      setOpen(!open);
    }
  };

  const handlerRedirect = (route) => {
    router.push(route);
    setOpen();
  };

  const logout = () => {
    router.push("/");
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      const newRouter = routers.map((route) => {
        if (route.auth) {
          route.auth = false;
          return route;
        }
        return route;
      });
      setRouters(newRouter);
    }
  }, [user]);

  return (
    <div
      className="align-items-center button-mobile-container"
      css={[menuMobileStyle, sidebarDashStyle]}
    >
      <div
        onClick={closeOverlay}
        className={`menu-mobile-overlay ${open ? "open" : ""}`}
      >
        <div className="menu-mobile-container ">
          <ul className="menu-mobile">
            {routers.map(({ title, icon, link, id, auth }) => (
              <React.Fragment key={id}>
                {!auth && (
                  <li className={"sidebar_item my-3 tooltip-custom"}>
                    <span
                      onClick={() => handlerRedirect(link)}
                      className={`sidebar_link ${
                        router.asPath === link ? "active" : ""
                      }`}
                    >
                      <span className={`sidebar_icon_container ${id}`}>
                        <i
                          id={"Tooltip-" + id}
                          className={`sidebar_icon ${id}`}
                        >
                          {icon}
                        </i>
                      </span>
                      <span className="sidebar_title">
                        <h5>{title}</h5>
                      </span>
                    </span>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuMobile;
