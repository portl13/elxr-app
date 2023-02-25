import React from "react";
import { Container } from "@material-ui/core";
import { Mealplan } from "../../components/suggestics/dashboard/mealplan/Mealplan";
import MainLayout from "@components/main/MainLayout";
import Head from "next/head";
import MainSidebar from "@components/main/MainSidebar";

function RecipePage() {
  return (
    <>
      <Head>
        <title>Recipe</title>
      </Head>
      <div className="meal-plan">
        <MainLayout sidebar={<MainSidebar />}>
          <Container
            maxWidth="lg"
            className="main-inner d-flex flex-column justify-content-between"
          >
            <Mealplan />
          </Container>
        </MainLayout>
        {/* <div className="copyright-text footer-mb">
        Copyright © 2010-2023 ELXR. All rights reserved.
      </div> */}
      </div>
    </>
  );
}

export default RecipePage;
