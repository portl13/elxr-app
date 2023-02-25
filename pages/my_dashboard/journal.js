import React from "react";
import { Container, Typography } from "@material-ui/core";
import { Journal } from "../../components/suggestics/dashboard/journal/Journal";
import MainLayout from "@components/main/MainLayout";
import MainSidebar from "@components/main/MainSidebar";
import Head from "next/head";

function JournalPage() {
  return (
    <>
      <Head>
        <title>Journal</title>
      </Head>
      <MainLayout sidebar={<MainSidebar />}>
        <Container
          maxWidth="lg"
          className="main-inner d-flex flex-column justify-content-between"
        >
          <Journal />
        </Container>
      </MainLayout>
      {/* <div className="copyright-text footer-mb">  
        Copyright © 2010-2023 ELXR. All rights reserved.
      </div> */}
    </>
  );
}

export default JournalPage;
