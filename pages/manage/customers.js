import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageCustomer from "@components/manage/section/ManageCustomer";

function Customers() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Customers"}>
        <BackButton />
        <ManageCustomer />
    </MainLayout>
  );
}

export default Customers;
