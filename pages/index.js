import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import MainHome from "@components/main/MainHome";

export default function Home() {
  return (
    <MainLayout classNameContainer={"home"} title={"PORTL"} sidebar={<MainSidebar />}>
      <MainHome />
    </MainLayout>
  );
}
