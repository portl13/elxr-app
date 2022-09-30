import React from "react";
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import SubcriptionIcon from "@icons/SubcriptionIcon";

const routers = [
  {
    link: "/purchases/overview",
    title: "Overview",
    icon: "/img/icon-movil/purchases-menu/overview.svg",
  },
  {
    link: "/purchases/orders",
    title: "Orders",
    icon: "/img/icon-movil/purchases-menu/orders.svg",
  },
  {
    link: "/purchases/subscriptions",
    title: "Subscriptions",
    icon: <SubcriptionIcon className="text-subscription" />,
  },
  {
    link: "/purchases/downloads",
    title: "Downloads",
    icon: "/img/icon-movil/purchases-menu/downloads.svg",
  },
  {
    link: "/purchases/courses",
    title: "Courses",
    icon: "/img/icon-movil/purchases-menu/courses.svg",
  },
];

function Purchases() {
  return (
    <MainLayout title="Studio" sidebar={<MainSidebar />}>
      <BackButton />
      <figure className="text-center mb-4 mt-3">
        <h3>Purchases</h3>
      </figure>
      <section className="container-menu-mobile">
        {routers.map((route) => (
          <ListNavItem key={route.link} data={route} />
        ))}
      </section>
    </MainLayout>
  );
}

export default Purchases;
