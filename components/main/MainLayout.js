import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style";
import Meta from "@components/layout/Meta";
import { UserContext } from "@context/UserContext";
import { useMenu } from "@context/MenuContext";
import MenuFooterMobile from "@components/layout/MenuFooterMobile";
import { preload } from "swr";
import { genericFetchWithTokenFeed } from "@request/creator";
import MainHeader from "@components/main/MainHeader";
import MainCategories from "@components/main/MainCategories";

function MainLayout({ children, className = "", title = "PORTL" }) {
  const { show } = useMenu();
  const { user } = useContext(UserContext);

  useEffect(() => {
    preload(
      `${process.env.bossApi}/activity?per_page=20&page=1`,
      genericFetchWithTokenFeed
    );
  }, []);

  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      <div
        css={layoutDashBoardStyle}
        className={`main_grid position-relative ${show ? "active" : ""}`}
      >
        <MainHeader />
        <main className="main">
          <MainCategories />
          <section className={"section-main"}>{children}</section>
        </main>
      </div>
      {/*<MenuMobile />*/}
      <MenuFooterMobile user={user} className={className} />
    </>
  );
}

export default MainLayout;
