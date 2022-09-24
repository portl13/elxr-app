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
  },
  {
    link: "/studio",
    title: "Studio",
    icon: "/img/icon-movil/me-menu/studio.svg",
  },
  {
    link: "/wallet",
    title: "Wallet",
    icon: "/img/icon-movil/me-menu/wallet.svg",
  },
  {
    link: "/purchases",
    title: "Purchases",
    icon: "/img/icon-movil/me-menu/bag.svg",
  },
  {
    link: "/studio",
    title: "Profile",
    icon: "/img/icon-movil/me-menu/profile.svg",
  },
  {
    link: "/settings",
    title: "Settings",
    icon: "/img/icon-movil/me-menu/settings.svg",
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
      <section>
        {routers.map((route) => (
          <ListNavItem key={route.link} data={route} />
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
