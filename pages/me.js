import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";
import { UserContext } from "@context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faEnvelope,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { stringToSlug } from "@lib/stringToSlug";
import { preload } from "swr";
import { genericFetch } from "@request/dashboard";
import Link from "next/link";

function Me() {
  const { user, logOut } = useContext(UserContext);

  const [routers, setRouters] = useState([
    {
      link: "/studio",
      title: "Studio",
      icon: "/img/icon-movil/me-menu/studio.svg",
      id: "studio",
      authorization: "creator",
      show: false,
    },
    {
      link: "/saved",
      title: "Saved",
      icon: "/img/icons/save-icon.svg",
      id: "saved",
      authorization: "all",
      show: true,
    },
    // {
    //   link: "/wallet",
    //   title: "Wallet",
    //   icon: "/img/icon-movil/me-menu/wallet.svg",
    //   id: "wallet",
    //   authorization: "all",
    //   show: true,
    // },
    {
      link: "/purchases",
      title: "Purchases",
      icon: "/img/icon-movil/me-menu/bag.svg",
      id: "purchases",
      authorization: "all",
      show: true,
    },
    {
      link: "/profile",
      title: "Profile",
      icon: "/img/icon-movil/me-menu/profile.svg",
      id: "profile",
      authorization: "all",
      show: true,
    },
    {
      link: "/members",
      title: "Find People",
      icon: "/img/icon-movil/me-menu/add-friends.svg",
      id: "members",
      authorization: "all",
      show: true,
    },
    {
      link: "/settings",
      title: "Settings",
      icon: "/img/icon-movil/me-menu/settings.svg",
      id: "settings",
      authorization: "all",
      show: true,
    },
    {
      link: "/send-invitations",
      title: "Send Invitations",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      id: "invitations",
      authorization: "all",
      show: true,
    },
  ]);
  const [isVendor, setIsVendor] = useState(false);

  const logout = async () => {
    setIsVendor(false);
    logOut();
  };

  useEffect(() => {
    if (user && user.rol === "vendor") {
      setIsVendor(true);
    }
    if (user) {
      const newRoutes = routers.map((route) => {
        if (route.id === "profile") {
          route.link = `/profile/${stringToSlug(user.displayName || user?.profile_name)}/${
            user.id
          }`;
        }
        return route;
      });
      setRouters(newRoutes);
    }
  }, [user]);

  useEffect(() => {
    if (isVendor) {
      const newRoutes = routers.map((route) => {
        if (route.id === "studio") {
          route.show = true;
        }
        return route;
      });
      setRouters(newRoutes);
    }
  }, [isVendor]);

  useEffect(() => {
    if (user) {
      const url = `${process.env.bossApi}/activity?per_page=20&page=1&scope=just-me&user_id=${user?.id}`;
      preload([url, user?.token], genericFetch);
    }
  }, [user]);
  console.log(user?.mention_name !== '')
  return (
    <MainLayout title="Studio" sidebar={<MainSidebar />}>
      <figure className="text-center mb-4 mt-3">
        <div className="me-avatar m-auto mb-3">
          <div className="ratio ratio-1x1">
            {user && user?.avatar_urls?.thumb && (
              <img width={100} height={100} src={user?.avatar_urls?.thumb} />
            )}
          </div>
        </div>
        <h3 className="title-me mt-3">Welcome, {user?.mention_name !== '' ? user?.profile_name : user.displayName}</h3>
      </figure>
      <section className="container-menu-mobile">
        {routers.map(
          (route) =>
            route.show && (
              <ListNavItem
                className={`menu-icon-${route.id}`}
                key={route.id}
                data={route}
              />
            )
        )}
        <article onClick={logout}>
          <span className="list-nav-item">
            <span style={{ color: "#99A4DF" }} className="list-nav-item-grupe">
              <FontAwesomeIcon icon={faPowerOff} />
            </span>
            <h4 className="list-nav-item-title">Log Out</h4>
            <span className="list-nav-item-icon">
              <FontAwesomeIcon icon={faAngleRight} />
            </span>
          </span>
        </article>
      </section>
      <section>
        <p className="text-center color-font">
          {user && `Logged in as: ${user?.mention_name !== '' ? user?.profile_name : user.displayName}`}
        </p>
      </section>
    </MainLayout>
  );
}

export default Me;
