import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import CreateProduct from "@components/calendar/CreateProduct";

function EditProduct({ id }) {
  return (
    <MainLayout title={"Edit Product"} sidebar={<MainSidebar />}>
      <BackButton />
      <CreateProduct id={id} />
    </MainLayout>
  );
}

export default EditProduct;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
