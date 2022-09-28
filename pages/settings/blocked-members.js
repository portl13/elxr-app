import React from "react";
import MainSidebar from "@components/main/MainSidebar";
import MainLayout from "@components/main/MainLayout";
import BlockedMembers from "@components/my-settings/BlockedMembers";
import BackButton from "@components/shared/button/BackButton";

function BlockedMembersPage() {
  return (
    <MainLayout sidebar={<MainSidebar />} title={"Blocked Members"}>
      <BackButton />
      <div className="container container-80">
        <BlockedMembers />
      </div>
    </MainLayout>
  );
}

export default BlockedMembersPage;
