import React, { useContext } from "react";
import { UserContext } from "@context/UserContext";
import Address from "@components/my-settings/Address";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";

function AddressesPage() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Addresses"}>
      <BackButton />
      <div className={"container container-80"}>
        <Address />
      </div>
    </MainLayout>
  );
}

export default AddressesPage;
