import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeContext } from "@context/ThemeContext";
import Logo from "@components/layout/Logo";
import CommunityIcon from "@icons/CommunityIcon";
import EventIcon from "@icons/EventIcon";
import ChannelIcon from "@icons/ChannelIcon";
import CourseIcon from "@icons/CourseIcon";
import CreatorIcon from "@icons/CreatorIcon";
import PodcastsIcon from "@icons/PodcastsIcon";
import VideosIcon from "@icons/VideosIcon";
import { sidebarDashStyle } from "@components/dashboard/sidebar/SidebarDashboard.style";
import BlogsIcon from "@icons/BlogsIcon";
import DiscoverIcon from "@icons/DiscoverIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMenu } from "@context/MenuContext";
import { Scrollbars } from "react-custom-scrollbars-2";
import { UserContext } from "@context/UserContext";
import { faBars, faMusic } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import ThemeIcon from "@icons/ThemeIcon";
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
    title: "Music",
    icon: <FontAwesomeIcon className={"dashboard-icon"} icon={faMusic} />,
    link: "/music",
    id: "music",
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

function MainSidebar() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { theme, changeTheme } = useContext(ThemeContext);
  const { show, toggleMenu, toggleMenuMovil } = useMenu();
  const [routers, setRouters] = useState(initialRouters);
  const [showTheme, setShowTheme] = useState(false);

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
    <>
      <div
        css={sidebarDashStyle}
        className={`sidebar_container ${show ? "active" : ""}`}
      >
        <div className="sidebar_header">
          <button
            onClick={() => toggleMenu()}
            className="btn-menu d-none d-lg-block"
          >
            <FontAwesomeIcon className="icon-menu" icon={faBars} />
          </button>
          <button onClick={toggleMenuMovil} className="btn-menu d-lg-none">
            <FontAwesomeIcon className="icon-menu" icon={faBars} />
          </button>
          <Logo
            className={"main-logo"}
            logo="/img/brand/logo.png"
            alt="PORTL"
          />
        </div>
        <ul className="sidebar_menu">
          <Scrollbars universal>
            {routers.map(({ title, icon, link, id, auth }) => (
              <React.Fragment key={id}>
                {!auth && (
                  <li className={"sidebar_item my-3 tooltip-custom"}>
                    <Link href={link}>
                      <a
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
                      </a>
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            <div className="theme-container mt-5 px-4">
              {showTheme ? (
                <ul className="theme theme-list pl-0 ">
                  <li className=" w-100 border-theme ">
                    <button
                      onClick={() => changeTheme("vivid")}
                      className="btn-theme w-100">{` ${theme === 'vivid'? ('Vivid (Current)') : ('Vivid') } `}</button>
                  </li>
                  <li className=" w-100 border-theme">
                    <button
                      onClick={() => changeTheme("night") }
                      className="btn-theme w-100">{` ${theme === 'night'? ('Night (Current)') : ('Night') } `}</button>
                  </li>
                  <li className=" w-100">
                    <button
                      onClick={() => changeTheme("midnigth")}
                      className="btn-theme w-100">{` ${theme === 'midnigth'? ('Midnigth (Current)') : ('Midnigth') } `}</button>
                  </li>
                </ul>
              ) : (<ul className="d-none border-0"></ul>)}
              <div className="mt-3 d-flex justify-content-center">
                <button
                  onClick={() => setShowTheme(!showTheme)}
                  className="btn-theme-transparent  d-flex flex-column align-items-center"
                >
                  <i>
                    <ThemeIcon className="width-icon-theme" />
                  </i>
                  <span>Theme</span>
                </button>
              </div>
            </div>
          </Scrollbars>
        </ul>
      </div>
    </>
  );
}

export default MainSidebar;
