import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import ProductIcon from '/public/img/icon-movil/manage-menu/product.svg'
import VideosIcon from "@icons/VideosIcon";
import PodcastsIcon from "@icons/PodcastsIcon";
import SubcriptionIcon from "@icons/SubcriptionIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap, faPodcast, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import {faYoutube} from "@fortawesome/free-brands-svg-icons";

const routersStore = [
    {
        link: "/manage/branding",
        title: "Branding",
        icon: "/img/icon-movil/manage-menu/branding-icon.svg",
    },
    {
        link: "/manage/subscription",
        title: "Subscription",
        icon: <SubcriptionIcon className="text-subscription" />,
    },
    {
        link: "/manage/products",
        title: "Products",
        icon: <ProductIcon />,
    },
    {
        link: "/manage/customers",
        title: "Customers",
        icon: "/img/icon-movil/manage-menu/customer.svg",
    },
    {
        link: "/manage/orders",
        title: "Orders",
        icon: "/img/icon-movil/manage-menu/orders-icon.svg",
    },
    {
        link: "/manage/payout",
        title: "Payout Method",
        icon: <FontAwesomeIcon icon={faSignOutAlt} rotation={180} />,
    }
];

const routersContent = [
    {
        link: "/manage/channels",
        title: "Channels",
        icon: "/img/icon-movil/create-menu/channles-icon.svg",
    },
    {
        link: "/manage/events",
        title: "Events",
        icon: "/img/icon-movil/create-menu/events.svg",
    },
    {
        link: "/manage/videos",
        title: "Videos",
        icon: <FontAwesomeIcon icon={faYoutube}  />,
    },
    {
        link: "/manage/podcasts",
        title: "Podcasts",
        icon: <FontAwesomeIcon className="text-podcast" icon={faPodcast} />,
    },
    {
        link: "/manage/blogs",
        title: "Blogs",
        icon: "/img/icon-movil/create-menu/blog-icon.svg",
    },
    {
        link: "/manage/courses",
        title: "Courses",
        icon: "/img/icon-movil/purchases-menu/courses.svg",
    },
    {
        link: "/manage/communities",
        title: "Communities",
        icon: "/img/icon-movil/create-menu/communities-icon.svg",
    }
];

function ManagePage() {
    return (
        <MainLayout sidebar={<MainSidebar />}>
            <BackButton />
            <figure className="text-center mb-4">
                <h3>Manage Store</h3>
            </figure>
            <section className="container-menu-mobile">
                {routersStore.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </section>
            <figure className="text-center mb-4">
                <h3>Manage Content</h3>
            </figure>
            <div className="container-menu-mobile">
                {routersContent.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </div>
        </MainLayout>
    );
}

export default ManagePage;