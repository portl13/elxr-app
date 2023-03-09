import React from "react";
import MainLayout from "@components/main/MainLayout";
import BackButton from "@components/shared/button/BackButton";
import Ordersdetails from "@components/my-purchases/orders/OrdersDetails";
import { getOrdersViewById } from "@api/channel.api";
import { getToken } from "next-auth/jwt";

function OrderDetail({ id, order }) {
  return (
    <MainLayout title={"Order Detail"}>
      <BackButton />
      <div className="container">
        <Ordersdetails order={order} id={id} />
      </div>
    </MainLayout>
  );
}

export default OrderDetail;

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  const session = await getToken({ req });
  const token = !session ? null : session?.user?.token;
  let order;

  try {
    const { data } = await getOrdersViewById({ token }, id);
    order = data?.data;
  } catch (e) {
    console.log(e);
  }

  return {
    props: { id, order },
  };
}
