import React, { useContext, useState } from "react";
import Head from "next/head";
import { useMenu } from "@context/MenuContext";
import { UserContext } from "@context/UserContext";
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style";
import Meta from "@components/layout/Meta";
import MenuFooterMobile from "@components/layout/MenuFooterMobile";
import MenuMobile from "@components/home/MenuMobile";
import MainHeader from '@components/main/MainHeader';

function MainLayout({ className = "", children, title = "PORTL" }) {
  const { show } = useMenu();
  const { user } = useContext(UserContext);

  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      <div css={layoutDashBoardStyle} className={`main_grid position-relative ${show ? "active" : ""}`}>
        <MainHeader />
        <main className="main">{children}</main>
      </div>
      <MenuMobile />
      <MenuFooterMobile user={user} className={className} />
    </>
  );
}

export default MainLayout;
