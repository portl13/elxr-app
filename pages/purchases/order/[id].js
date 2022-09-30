import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import Ordersdetails from "@components/my-purchases/orders/OrdersDetails";

function OrderDetail({ id }) {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Order Detail"}>
      <BackButton />
      <div className="container container-80">
        <Ordersdetails id={id} />
      </div>
    </MainLayout>
  );
}

export default OrderDetail;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
