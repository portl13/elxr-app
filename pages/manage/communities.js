import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import BackButton from "@components/shared/button/BackButton";
import ListNavItem from "@components/layout/ListNavItem";

function Communities() {
  return (
    <MainLayout title="Communities" sidebar={<MainSidebar />}>
      <BackButton />
      <div className="my-5">
        <ListNavItem
          data={{
            type: "heading",
            title: "Communities",
            icon: "/img/icon-movil/create-menu/communities-icon.svg",
          }}
        />
      </div>
    </MainLayout>
  );
}

export default Communities;
