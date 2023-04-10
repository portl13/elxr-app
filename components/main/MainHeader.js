import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import MenuHeader from "@components/home/MenuHeader";
import AuthButtons from "@components/home/AuthButtons";
import Logo from "@components/layout/Logo";
import DiscoverMenu from "./menus/DiscoverMenu";
import InputSearch from "@components/ui/inputs/InputSearch";
import { ChannelContext } from "@context/ChannelContext";
import { useMenu } from "@context/MenuContext";
import MenuIcon from "@icons/MenuIcon";
import { useRouter } from "next/router";
import { stringToSlug } from "@lib/stringToSlug";
import Cart from "@components/shared/button/Cart";
import Link from "next/link";
import {useCart} from "@context/CartContext";

const allowedRoutes = [
  "/",
  "/home",
  "/channels",
  "/professionals",
  "/events",
  "/videos",
  "/podcasts",
  "/music",
  "/blogs",
  "/courses",
];

const allowedRoutesText = {
  "/": "Search for Channels, Events, Video, Podcasts and more...",
  "/home": "Search for Channels, Events, Video, Podcasts and more...",
  "/channels": "Search for Channels",
  "/professionals": "Search for Professionals",
  "/events": "Search for Events",
  "/videos": "Search for Videos",
  "/podcasts": "Search for Podcasts",
  "/music": "Search for Music",
  "/blogs": "Search for Blogs",
  "/courses": "Search for Courses",
};

function MainHeader({ branding }) {
  const router = useRouter();
  const { toggleMenuMovil } = useMenu();
  const { setSearch, search } = useContext(ChannelContext);
  const { user, auth, isNew } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const { countItems } = useCart();
  return (
    <header className={`header ${auth ? "auth" : ""} z-index-3 `}>
      <button onClick={toggleMenuMovil} className="btn-menu d-lg-none">
        <MenuIcon className="icon-menu mb-1 text-font" />
      </button>

      <div className="d-flex  aling-items-center justify-content-center">
        {countItems > 0 ? (
          <li className="list-unstyled d-md-none">
            <Link href="/cart">
              <a className="menu-movil-icon pointer position-relative text-white">
                <Cart className="width-22" />
              </a>
            </Link>
          </li>
        ) : null}
      </div>

      <div className="d-flex justify-content-center justify-content-md-start">
        <Logo
          link={
            branding?.user_id && branding?.show_all
              ? `/creator/${stringToSlug(branding?.username)}/${
                  branding?.user_id
                }`
              : "/"
          }
          logo={branding?.logo || "/img/brand/logo.png"}
          isCustom={Boolean(branding?.logo)}
          alt="Portl"
        />
      </div>

      <div>
        <div className="w-100 row mx-4 d-none d-md-flex">
          <div className="col-3 d-flex align-items-center">
            <DiscoverMenu open={open} setOpen={setOpen} />
          </div>
          {allowedRoutes.includes(router.asPath) ? (
            <>
              <div className="col-7 p-0 d-none d-lg-block">
                <InputSearch
                  placeholder={allowedRoutesText[router.asPath]}
                  value={search}
                  setValue={setSearch}
                />
              </div>{" "}
            </>
          ) : null}
        </div>
      </div>

      <div
        className={`d-flex align-items-center ${
          auth ? "justify-content-end" : "justify-content-start"
        } justify-content-md-center`}
      >
        {auth && <MenuHeader user={user} isNew={isNew} />}
        {!auth && <AuthButtons />}
      </div>
    </header>
  );
}

export default MainHeader;
