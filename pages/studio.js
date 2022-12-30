import React, { useContext } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Image from "next/image";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import { UserContext } from "@context/UserContext";
import ManagerIcon from "@icons/ManagerIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-solid-svg-icons";

const routers = [
  {
    link: "/create",
    title: "Create",
    icon: "/img/icon-movil/studio-menu/edit-icon.svg",
    type: "link",
  },
  {
    link: "/manage",
    title: "Manage",
    icon: <ManagerIcon className="text-manager" />,
    type: "link",
  },
  {
    link: "/calendar-menu",
    title: "Calendar",
    icon: <FontAwesomeIcon icon={faCalendar} />,
    type: "link",
  },
];

function StudioPage() {
  const { user } = useContext(UserContext);
  return (
    <MainLayout title="Studio" sidebar={<MainSidebar />}>
      <BackButton />
      <figure className="text-center mb-4">
        <Image width={100} height={100} src="/img/brand/we-icon.png" />
        <h3>Studio</h3>
      </figure>
      <section className="container-menu-mobile">
        {routers.map((route) => (
          <ListNavItem key={route.link} data={route} />
        ))}
        {user ? (
          <ListNavItem
            data={{
              link: `/creator/my-page/${user.id}`,
              title: "My Page",
              icon: "/img/brand/we-icon.png",
              type: "link",
            }}
          />
        ) : null}
      </section>
      <section className="text-center color-font mt-5">
        {user && `Logged in as: ${user.name}`}
      </section>
    </MainLayout>
  );
}

export default StudioPage;
