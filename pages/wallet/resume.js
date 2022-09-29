import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import WalletBalance from "@components/wallet/components/WalletBalance";
import BackButton from "@components/shared/button/BackButton";
import MyBalance from "@components/my-wallet/MyBalance";

function ResumePage() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Balance"}>
      <BackButton />
      <div className="container container-80">
        <div className={"d-flex justify-content-end mb-4"}>
          <MyBalance />
        </div>
        <WalletBalance />
      </div>
    </MainLayout>
  );
}

export default ResumePage;
