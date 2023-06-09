import React, { useState } from "react";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import { useRouter } from "next/router";
import ScrollTags from "@components/shared/slider/ScrollTags";
import ButtonCategory from "@components/main/ui/ButtonCategory";

const categories = [
  {
    id: "/events",
    name: "elxr Live",
  },
  {
    id: "/events/partner",
    name: "Partner Events",
  },
];

function EventsLayout({ children, title = "Events" }) {
  const router = useRouter();

  const redirect = (route) => {
    router.push(route);
  };

  return (
    <>
      <MainLayout title={title} sidebar={<MainSidebar />}>
        {/*<div className="row">*/}
        {/*  <div className="col-12">*/}
        {/*    <h4 className="mb-4 font-weight-bold">Events</h4>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="row">*/}
        {/*  <div className="col-12 col-md-9 mb-4 mb-md-4">*/}
        {/*    <ScrollTags>*/}
        {/*      {categories?.map((value) => (*/}
        {/*        <div key={value.id}>*/}
        {/*          <ButtonCategory*/}
        {/*            setCat={() => redirect(value.id)}*/}
        {/*            text={value.name}*/}
        {/*            active={router.asPath === value.id}*/}
        {/*          />*/}
        {/*        </div>*/}
        {/*      ))}*/}
        {/*    </ScrollTags>*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="row">*/}
        {/*  <div className="col-12 d-flex justify-content-between mb-2">*/}
        {/*    <h4 className="font-size-14 text-uppercase">{title}</h4>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {children}
      </MainLayout>
    </>
  );
}

export default EventsLayout;
