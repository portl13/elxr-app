import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MyBalance from "@components/my-wallet/MyBalance";
import WalletTopup from "@components/walletTopup/WalletTopup";

function TopupPage() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Topup"}>
      <BackButton />
      <div className="container container-80">
        <div className={"d-flex justify-content-end mb-4"}>
          <MyBalance />
        </div>
          <WalletTopup />
      </div>
    </MainLayout>
  );
}

export default TopupPage;
