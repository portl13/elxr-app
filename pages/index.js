import React from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";

export default function Home() {
  return (
    <MainLayout title={"PORTL"} sidebar={<MainSidebar />} />
  );
}
