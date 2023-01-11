import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { layoutDashBoardStyle } from "@components/layout/LayoutDashBoard.style";
import Meta from "@components/layout/Meta";
import MenuHeader from "@components/home/MenuHeader";
import { UserContext } from "@context/UserContext";
import { css } from "@emotion/core";
import AuthButtons from "@components/home/AuthButtons";
import { useMenu } from "@context/MenuContext";
import MenuFooterMobile from "@components/layout/MenuFooterMobile";
import MenuMobile from "@components/home/MenuMobile";
import { preload } from "swr";
import useDebounce from "@hooks/useDebounce";
import {genericFetchWithTokenFeed, getFetchPublic} from "@request/creator";


const categoriesUrl = `${process.env.apiV2}/channels/categories/`;

function MainLayout({ className = "", title = "PORTL" }) {
  const { show } = useMenu();
  const { user } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const debounceTerm = useDebounce(search, 500);
  const [category, setCategory] = useState("");

  const { data: categories } = useSWRImmutable(categoriesUrl, getFetchPublic);


function MainLayout({ className = "", children, sidebar, title = "PORTL" }) {
  const { show } = useMenu();
  const { user, auth } = useContext(UserContext);

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
      <div css={layoutDashBoardStyle} className={`main_grid position-relative ${show ? "active" : ""}`}>
        <MainHeader search={search} setSearch={setSearch} />
        <main className="main p-0">
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
