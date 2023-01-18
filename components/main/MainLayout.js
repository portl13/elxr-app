import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style";
import Meta from "@components/layout/Meta";
import { UserContext } from "@context/UserContext";
import { useMenu } from "@context/MenuContext";
import MenuFooterMobile from "@components/layout/MenuFooterMobile";
import { preload } from "swr";
import { genericFetch as fetchPublic } from "@request/creator";
import MainHeader from "@components/main/MainHeader";
import MainCategories from "@components/main/MainCategories";
import MenuMobile from "@components/MenuMobile/MenuMobile";
import { genericFetch } from "@request/dashboard";

function MainLayout({
  children,
  className = "",
  title = "PORTL",
  classNameContainer = "",
}) {
  const { show } = useMenu();
  const { user, status } = useContext(UserContext);

  useEffect(() => {
    if (status === "loading") return;
    preload(
      status === "authenticated" && user
        ? [
            `${process.env.bossApi}/activity?per_page=20&page=1&scope=following`,
            user?.token,
          ]
        : `${process.env.bossApi}/activity?per_page=20&page=1`,
      status === "authenticated" && user ? genericFetch : fetchPublic
    );
  }, [status]);
  
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
          <section className={`section-main ${classNameContainer}`}>
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
