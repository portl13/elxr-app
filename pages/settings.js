import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";

const routers = [
    {
        link: "/settings/login-information",
        title: "Login Information",
        icon: "/img/icon-movil/settings-menu/users.svg",
    },
    {
        link: "/settings/email-preferences",
        title: "Email Preferences",
        icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
        link: "/settings/privacy",
        title: "Privacy",
        icon: "/img/icon-movil/settings-menu/privacy.svg",
    },
    {
        link: "/settings/blocked-members",
        title: "Blocked Members",
        icon: "/img/icon-movil/settings-menu/blocked.svg",
    },
    {
        link: "/settings/group-invites",
        title: "Group Invites",
        icon: "/img/icon-movil/settings-menu/group.svg",
    },
    {
        link: "/settings/export-data",
        title: "Export Data",
        icon: "/img/icon-movil/settings-menu/cloud.svg",
    },
    {
        link: "/settings/delete-account",
        title: "Delete Account",
        icon: "/img/icon-movil/settings-menu/trash.svg",
    },
    {
        link: "/settings/addresses",
        title: "Addresses",
        icon: "/img/icon-movil/settings-menu/address.svg",
    },
    {
        link: "/settings/payment-methods",
        title: "Payment Methods",
        icon: "/img/icon-movil/settings-menu/credit-card.svg",
    }
];

function SettingsPage() {
    return (
        <MainLayout title="Studio" sidebar={<MainSidebar />}>
            <BackButton />
            <figure className="text-center mb-4 mt-3">
                <h3>Settings</h3>
            </figure>
            <section className="container-menu-mobile">
                {routers.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </section>
        </MainLayout>
    );
}

export default SettingsPage;