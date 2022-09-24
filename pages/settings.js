import React from 'react';
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import ListNavItem from "@components/layout/ListNavItem";

const routers = [
    {
        link: "/my-wallet",
        title: "Login Information",
        icon: "/img/icon-movil/settings-menu/users.svg",
    },
    {
        link: "/topup",
        title: "Email Preferences",
        icon: "/img/icon-movil/settings-menu/inbox.svg",
    },
    {
        link: "/transfer",
        title: "Privacy",
        icon: "/img/icon-movil/settings-menu/privacy.svg",
    },
    {
        link: "/transactions",
        title: "Blocked Members",
        icon: "/img/icon-movil/settings-menu/blocked.svg",
    },
    {
        link: "/withdrawal",
        title: "Group Invites",
        icon: "/img/icon-movil/settings-menu/group.svg",
    },
    {
        link: "/withdrawal",
        title: "Export Data",
        icon: "/img/icon-movil/settings-menu/cloud.svg",
    },
    {
        link: "/withdrawal",
        title: "Delete Account",
        icon: "/img/icon-movil/settings-menu/trash.svg",
    },
    {
        link: "/withdrawal",
        title: "Addresses",
        icon: "/img/icon-movil/settings-menu/address.svg",
    },
    {
        link: "/withdrawal",
        title: "Payment Methods",
        icon: "/img/icon-movil/settings-menu/credit-card.svg",
    },
    {
        link: "/withdrawal",
        title: "Account Details",
        icon: "/img/icon-movil/settings-menu/account.svg",
    },
];

function SettingsPage(props) {
    return (
        <MainLayout title="Studio" sidebar={<MainSidebar />}>
            <figure className="text-center mb-4 mt-3">
                <h3>Settings</h3>
            </figure>
            <section>
                {routers.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </section>
        </MainLayout>
    );
}

export default SettingsPage;