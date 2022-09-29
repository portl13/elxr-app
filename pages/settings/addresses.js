import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "@context/UserContext";
import Address from "@components/my-settings/Address";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import { myAccountWrapper } from "@components/my-account/MyAccountWrapper.style";
import { MySettingsStyle } from "@components/my-settings/MySettingsStyle";

function AddressesPage() {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const handleRedirect = async (e) => {
    await router.push(`/settings/address/${e}`);
  };

  return (
    <MainLayout sidebar={<MainSidebar />} title={"Addresses"}>
      <BackButton />
      <div css={myAccountWrapper}>
        <div css={MySettingsStyle}>
          <Address user={user} handleRedirect={handleRedirect} />
        </div>
      </div>
    </MainLayout>
  );
}

export default AddressesPage;
