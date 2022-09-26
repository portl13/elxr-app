import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ManageOrders from "@components/manage/section/ManageOrders";

function Orders() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Orders"}>
      <BackButton />
      <ManageOrders />
    </MainLayout>
  );
}

export default Orders;
