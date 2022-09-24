import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";

const routersStore = [
    {
        link: "/create",
        title: "Branding",
        icon: "/img/icon-movil/manage-menu/branding-icon.svg",
    },
    {
        link: "/create",
        title: "Subscription",
        icon: "/img/icon-movil/manage-menu/subscription-icon.svg",
    },
    {
        link: "/create",
        title: "Products",
        icon: "/img/icon-movil/manage-menu/product-icon.svg",
    },
    {
        link: "/create",
        title: "Customers",
        icon: "/img/icon-movil/manage-menu/customer.svg",
    },
    {
        link: "/create",
        title: "Orders",
        icon: "/img/icon-movil/manage-menu/orders-icon.svg",
    }
];

const routersContent = [
    {
        link: "/create",
        title: "Channels",
        icon: "/img/icon-movil/create-menu/channles-icon.svg",
    },
    {
        link: "/create",
        title: "Events",
        icon: "/img/icon-movil/create-menu/events.svg",
    },
    {
        link: "/create",
        title: "Videos",
        icon: "/img/icon-movil/create-menu/video-icon.svg",
    },
    {
        link: "/create",
        title: "Podcasts",
        icon: "/img/icon-movil/create-menu/podcast.svg",
    },
    {
        link: "/create",
        title: "Blogs",
        icon: "/img/icon-movil/create-menu/blog-icon.svg",
    },
    {
        link: "/create",
        title: "Courses",
        icon: "/img/icon-movil/create-menu/courses-icon.svg",
    },
    {
        link: "/create",
        title: "Communities",
        icon: "/img/icon-movil/create-menu/communities-icon.svg",
    },
    {
        link: "/create",
        title: "Meetings",
        icon: "/img/icon-movil/create-menu/meetings.svg",
    },
];

function ManagePage() {
    return (
        <MainLayout sidebar={<MainSidebar />}>
            <figure className="text-center mb-4">
                <h3>Manage Store</h3>
            </figure>
            {routersStore.map((route) => (
                <ListNavItem key={route.link} data={route} />
            ))}
            <figure className="text-center mb-4">
                <h3>Manage Content</h3>
            </figure>
            {routersContent.map((route) => (
                <ListNavItem key={route.link} data={route} />
            ))}
        </MainLayout>
    );
}

export default ManagePage;