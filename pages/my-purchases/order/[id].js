import React from "react";
import Head from "next/head";
import MyPurchasesLayout from "@components/my-purchases/MyPurchasesLayout";
import OrderDetails from "../../../components/my-purchases/orders/OrderDetails";

function OrderDetail() {
  return (
    <>
      <Head>
        <title>Order Detail</title>
      </Head>
      <MyPurchasesLayout>
        <OrderDetails/>
      </MyPurchasesLayout>
    </>
  );
}

export default OrderDetail;
