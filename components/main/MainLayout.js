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
import MenuMobile from "@components/MenuMobile/MenuMobile";

function MainLayout({
  children,
  className = "",
  title = "PORTL",
  classNameContainer = "",
}) {
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
        <MainHeader user={user} />
        <main className={`main`}>
          <MainCategories />
          <section className={`section-main px-0 py-0 ${classNameContainer}`}>
            {children}
          </section>
        </main>
      </div>
      <MenuMobile />
      {user ? <MenuFooterMobile user={user} className={className} /> : null}
    </>
  );
}

export default MainLayout;
