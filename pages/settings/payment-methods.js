import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Payment from "@components/my-settings/Payment";
import BackButton from "@components/shared/button/BackButton";
import { myAccountWrapper } from "@components/my-account/MyAccountWrapper.style";
import { MySettingsStyle } from "@components/my-settings/MySettingsStyle";

function PaymentMethods() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Payment Methods"}>
      <BackButton />
      <div css={myAccountWrapper}>
        <div css={MySettingsStyle}>
          <Payment />
        </div>
      </div>
    </MainLayout>
  );
}

export default PaymentMethods;
