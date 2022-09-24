import React from 'react';
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import ListNavItem from "@components/layout/ListNavItem";

const routers = [
    {
        link: "/my-wallet",
        title: "Overview",
        icon: "/img/icon-movil/purchases-menu/overview.svg",
    },
    {
        link: "/topup",
        title: "Orders",
        icon: "/img/icon-movil/purchases-menu/orders.svg",
    },
    {
        link: "/transfer",
        title: "Subscriptions",
        icon: "/img/icon-movil/purchases-menu/subscription-icon.svg",
    },
    {
        link: "/transactions",
        title: "Downloads",
        icon: "/img/icon-movil/purchases-menu/downloads.svg",
    },
    {
        link: "/withdrawal",
        title: "Courses",
        icon: "/img/icon-movil/purchases-menu/courses.svg",
    },
];

function Purchases() {
    return (
        <MainLayout title="Studio" sidebar={<MainSidebar />}>
            <figure className="text-center mb-4 mt-3">
                <h3>Purchases</h3>
            </figure>
            <section>
                {routers.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </section>
        </MainLayout>
    );
}

export default Purchases;