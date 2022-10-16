import EventDetails from "@components/main/details/EventDetails";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Head from "next/head";
import React from "react";

function PageEventDetails({ id }) {
  return (
    <MainLayout className={"menu-footer-none"} title={"Event Detail"} sidebar={<MainSidebar />}>
      <EventDetails id={id} classNameIcons={'icon-responsive'}/>
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
