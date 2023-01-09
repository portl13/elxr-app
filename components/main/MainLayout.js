import React, { useContext, useState } from "react";
import Head from "next/head";
import useSWRImmutable from "swr/immutable";
import { useMenu } from "@context/MenuContext";
import { UserContext } from "@context/UserContext";
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style";
import Meta from "@components/layout/Meta";
import MainHeader from '@components/main/MainHeader';
import MainCategories from "@components/main/MainCategories";
import MainHome from "@components/main/MainHome";
import MenuMobile from "@components/home/MenuMobile";
import MenuFooterMobile from "@components/layout/MenuFooterMobile";
import useDebounce from "@hooks/useDebounce";
import { getFetchPublic } from "@request/creator";

const categoriesUrl = `${process.env.apiV2}/channels/categories/`;

function MainLayout({ className = "", title = "PORTL" }) {
  const { show } = useMenu();
  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [category, setCategory] = useState("");

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);

  return (
    <>
      <Meta />
      <Head>
        <title>{title}</title>
      </Head>
      <div css={layoutDashBoardStyle} className={`main_grid position-relative ${show ? "active" : ""}`}>
        <MainHeader />
        <main className="main">
          <MainCategories categories={categories} category={category} setCategory={setCategory} />
          <MainHome category={category} debounceTerm={debounceTerm} />
        </main>
      </div>
      <MenuMobile />
      <MenuFooterMobile user={user} className={className} />
    </>
  );
}

export default MainLayout;
