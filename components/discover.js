import React from "react";
import MainHome from "@components/main/MainHome";
import MainLayout from "@components/main/MainLayout";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";

function Discover() {
  return (
    <>
      <SeoMetaComponent
        title={`ELXR Health Community`}
        description={
          "Elxr is your one platform to grow your business, monetize content, manage clients, and generate recurring revenue for life."
        }
        titleContent={"ELXR Health Community"}
        image={"/img/brand/elxr-seo.jpg"}
        url={process.env.nextSite}
      />
      <MainLayout classNameContainer={"home"} title={"Elxr"}>
        <MainHome />
      </MainLayout>
    </>
  );
}

export default Discover;
