import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import CreateProduct from "@components/calendar/CreateProduct";

export default function CreateProductPage() {
  return (
    <MainLayout title={"Create Product"} sidebar={<MainSidebar />}>
      <BackButton />
      <CreateProduct />
    </MainLayout>
  );
}
