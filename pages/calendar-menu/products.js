import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import CalendarProducts from "@components/calendar/CalendarProducts";

function ProductsAppointableList() {
  return (
    <MainLayout title="Products" sidebar={<MainSidebar />}>
      <BackButton />
      <CalendarProducts />
    </MainLayout>
  );
}

export default ProductsAppointableList;
