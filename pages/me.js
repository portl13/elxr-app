import React, { useContext } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Image from "next/image";
import ListNavItem from "@components/layout/ListNavItem";
import { UserContext } from "@context/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";

const routers = [
  {
    link: "/create",
    title: "Dashboard",
    icon: "/img/icon-movil/me-menu/dashboard.svg",
    id: "create"
  },
  {
    link: "/studio",
    title: "Studio",
    icon: "/img/icon-movil/me-menu/studio.svg",
    id: "studio"
  },
  {
    link: "/saved",
    title: "Saved",
    icon: "/img/icons/save-icon.svg",
    id:"saved"
  },
  {
    link: "/wallet",
    title: "Wallet",
    icon: "/img/icon-movil/me-menu/wallet.svg",
    id: "wallet"
  },
  {
    link: "/purchases",
    title: "Purchases",
    icon: "/img/icon-movil/me-menu/bag.svg",
    id: "purchases"
  },
  {
    link: "/studio",
    title: "Profile",
    icon: "/img/icon-movil/me-menu/profile.svg",
    id: "studio"
  },
  {
    link: "/settings",
    title: "Settings",
    icon: "/img/icon-movil/me-menu/settings.svg",
    id: "settings"
  },
];

function Me() {
  const { user } = useContext(UserContext);
  console.log(user)
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
        {routers.map((route) => (
          <ListNavItem className={`menu-icon-${route.id}`} key={route.id} data={route} />
        ))}
      </section>
      <section>
        <p className="text-center">Logged in as: {user && user?.email && user.email}</p>
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
