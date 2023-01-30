import EventDetails from "@components/main/details/EventDetails";
import MainLayout from "@components/main/MainLayout";
import React from "react";

function PageEventDetails({ id }) {
  return (
    <MainLayout
      className={"d-none"}
      title={"Event Detail"}
      disappear={true}
      classNameMain={"p-0"}
    >
      <EventDetails id={id} classNameIcons={"icon-responsive"} />
    </MainLayout>
  );
}

export default PageEventDetails;

export async function getServerSideProps({ query }) {
  const { id } = query;
  return {
    props: { id },
  };
}
