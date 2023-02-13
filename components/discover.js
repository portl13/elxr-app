import React from "react";
import MainHome from "@components/main/MainHome";
import MainLayout from "@components/main/MainLayout";

function Discover() {
  return (
    <MainLayout classNameContainer={"home"} title={"Elxr"}>
      <MainHome />
    </MainLayout>
  );
}

export default Discover;
