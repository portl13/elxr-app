import React from "react";
import MainHome from "@components/main/MainHome";
import MainLayout from "@components/main/MainLayout";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";

function Discover() {
  return (
    <>
      <SeoMetaComponent
        title={`Elxr Creative Community`}
        description={
          "One platform to create, discover and share.  Live streams, podcasts, music, videos, courses and more."
        }
        titleContent={"PORTL Creative Community"}
        image={"/img/portl.jpg"}
        url={process.env.nextSite}
      />
      <MainLayout classNameContainer={"home"} title={"Elxr"}>
        <MainHome />
      </MainLayout>
    </>
  );
}

export default Discover;
