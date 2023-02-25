import React from "react";
import { Container, Typography } from "@material-ui/core";
import Layout from "../../components/layout/Layout";
import { ShoppingList } from "../../components/suggestics/dashboard/shopping-list/ShoppingList";
// import CoreLayout from '../../components/layout/CoreLayouts';

function ShoppingPage() {
  return (
    <>
      {/* <Layout> */}
      <Container
        maxWidth="lg"
        className="main-inner d-flex flex-column justify-content-between"
      >
        <ShoppingList />
      </Container>
      {/* </Layout> */}
      <div className="copyright-text">
        Copyright © 2010-2023 ELXR. All rights reserved.
      </div>
    </>
  );
}

export default ShoppingPage;
