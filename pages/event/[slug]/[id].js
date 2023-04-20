import EventDetails from "@components/main/details/EventDetails";
import MainLayout from "@components/main/MainLayout";
import React from "react";
import SeoMetaComponent from "@components/seo/SeoMetaComponent";
import { stringToSlug } from "@lib/stringToSlug";

const url = `${process.env.apiV2}/channel-event/`;

import NonSsrWrapper from "../../../components/no-ssr-wrapper/NonSSRWrapper";
import { getDataSever } from "@request/shared";

function PageEventDetails({ id, event }) {
  return (
    <>
      <SeoMetaComponent
        title={`Elxr | ${event?.title}`}
        description={event?.description}
        titleContent={event?.title}
        image={event?.thumbnail}
        url={
          process.env.nextSite + `/event/${stringToSlug(event?.title)}/${id}`
        }
      />
      <MainLayout
        className={"d-none"}
        title={`Elxr | ${event?.title}`}
        disappear={true}
        classNameMain={"p-0"}
        branding={event?.branding}
      >
        <NonSsrWrapper>
          <EventDetails
            id={id}
            classNameIcons={"icon-responsive"}
            eventData={event}
          />
        </NonSsrWrapper>
      </MainLayout>
    </>
  );
}

export default PageEventDetails;

export async function getServerSideProps({ query, req }) {
  const { id } = query;
  let event;
  try {
    event = await getDataSever(url + id, req);
  } catch (e) {
    console.log(e);
  }
  return {
    props: { id, event },
  };
}
