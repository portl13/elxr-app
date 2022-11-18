import React, { useContext, useEffect, useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";
import { UserContext } from "@context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";
import { signOut } from "next-auth/react";

function Me() {
  const { user, setUser, deleteCookie } = useContext(UserContext);
  const [routers, setRouters] = useState([
    {
      link: "/create",
      title: "Dashboard",
      icon: "/img/icon-movil/me-menu/dashboard.svg",
      id: "create",
      authorization: "all",
      show: true,
    },
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
    {
      link: "/wallet",
      title: "Wallet",
      icon: "/img/icon-movil/me-menu/wallet.svg",
      id: "wallet",
      authorization: "all",
      show: true,
    },
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
  ]);

  const [isVendor, setIsVendor] = useState(false);

  const logout = async () => {
    setIsVendor(false);
    setUser(null);
    deleteCookie();
    await signOut();
  };

  useEffect(() => {
    if (user && user.rol === "vendor") {
      setIsVendor(true);
    }
    if (user) {
      const newRoutes = routers.map((route) => {
        if (route.id === "profile") {
          route.link = `/profile/${stringToSlug(user.profile_name)}/${
            user.id
          }?key=timeline&tab=personal`;
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
        <h3 className="title-me mt-3">Welcome, {user && user.name}</h3>
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
        <p className="text-center">{user && `Logged in as: ${user.name}`}</p>
        <ul className="faq-list">
          <li>FAQ</li>
          <li className="mx-2">|</li>
          <li>Support</li>
          <li className="mx-2">|</li>
          <li>Terms</li>
        </ul>
      </section>
    </MainLayout>
  );
}

export default Me;
