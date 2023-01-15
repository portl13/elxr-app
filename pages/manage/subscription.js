import React from "react";
import Subcription from "@components/dashboard/subcription/Subcription";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";
import SubcriptionIcon from "@icons/SubcriptionIcon";

function SubscriptionPage() {
  return (
    <MainLayout title="Subscription" sidebar={<MainSidebar />}>
      <BackButton />
      <div className="container container-80">
        <div className="my-5">
          <ListNavItem
            data={{
              type: "heading",
              title: "Subscription",
              icon: <SubcriptionIcon className="text-subscription" />,
            }}
          />
        </div>
      </div>
      <Subcription />
    </MainLayout>
  );
}

export default SubscriptionPage;
