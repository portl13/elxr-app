import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import Orders from "@components/my-purchases/orders/Orders";

function OrdersPage() {
  return (
    <MainLayout title={"Orders"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80">
          <Orders />
      </div>
    </MainLayout>
  );
}

export default OrdersPage;
