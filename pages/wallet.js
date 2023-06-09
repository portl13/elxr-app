import React from 'react';
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import ListNavItem from "@components/layout/ListNavItem";
import BackButton from "@components/shared/button/BackButton";

const routers = [
    {
        link: "/wallet/resume",
        title: "My Wallet",
        icon: "/img/icon-movil/wallet-menu/wallet.svg",
    },
    {
        link: "/wallet/topup",
        title: "Topup",
        icon: "/img/icon-movil/wallet-menu/topup.svg",
    },
    {
        link: "/wallet/transfer",
        title: "Transfer",
        icon: "/img/icon-movil/wallet-menu/transfer.svg",
    },
    // {
    //     link: "/wallet/transactions",
    //     title: "Transactions",
    //     icon: "/img/icon-movil/wallet-menu/transactions.svg",
    // },
    // {
    //     link: "/wallet/withdrawal",
    //     title: "Withdrawal",
    //     icon: "/img/icon-movil/wallet-menu/withdrawal.svg",
    // },
];

function Wallet() {
    return (
        <MainLayout title="Studio" sidebar={<MainSidebar />}>
            <BackButton />
            <figure className="text-center mb-4 mt-3">
                <h3>Wallet</h3>
            </figure>
            <section className="container-menu-mobile">
                {routers.map((route) => (
                    <ListNavItem key={route.link} data={route} />
                ))}
            </section>
        </MainLayout>
    );
}

export default Wallet;