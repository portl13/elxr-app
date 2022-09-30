import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import MySubscriptions from "@components/my-purchases/subscriptions/MySubscriptions";

function SubscriptionsPage() {
  return (
    <MainLayout title={"Subscriptions"} sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80">
          <MySubscriptions />
      </div>
    </MainLayout>
  );
}

export default SubscriptionsPage;
