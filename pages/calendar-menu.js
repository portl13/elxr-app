import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Head from "next/head";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import ManagerIcon from "@icons/ManagerIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-regular-svg-icons";

const routers = [
  // {
  //   link: "/calendar-menu/create-appointment",
  //   title: "Create Appointment",
  //   icon: <FontAwesomeIcon icon={faCalendarPlus} />
  // },
  {
    link: "/calendar-menu/view-appointment",
    title: "Appointments Calendar",
    icon: <FontAwesomeIcon icon={faCalendarAlt} />,
  },
  {
    link: "/calendar-menu/appointments-list",
    title: "Appointments List",
    icon: <FontAwesomeIcon icon={faCalendar} />,
  },
  {
    link: "/calendar-menu/products",
    title: "Appointable List",
    icon: "/img/icon-movil/studio-menu/product-list-mode.svg",
  },
  {
    link: "/calendar-menu/create-product",
    title: "Create Appointable",
    icon: "/img/icon-movil/studio-menu/product-Icon.svg",
  },
  {
    link: "/manage/orders",
    title: "Manage Orders",
    icon: <ManagerIcon className="text-manager" />,
  },
  // {
  //   link: "/calendar-menu/set-availability",
  //   title: "Set Availability",
  //   icon: "/img/icon-movil/studio-menu/schedule.svg",
  // },
];

function CalendarMenuPage() {
  return (
    <>
      <Head>
        <title>Dashboard Menu</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <BackButton />
        <figure className="text-center mb-4">
          <h3>Calendar</h3>
        </figure>
        <section className="container-menu-mobile">
          {routers.map((route) => (
            <ListNavItem key={route.link} data={route} />
          ))}
        </section>
      </MainLayout>
    </>
  );
}

export default CalendarMenuPage;
