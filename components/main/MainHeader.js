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

function MainHeader() {
  const router = useRouter();
  const { toggleMenuMovil } = useMenu();
  const { setSearch, search } = useContext(ChannelContext);
  const { user, auth } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  return (
    <header className="header z-index-4 d-flex justify-content-between">
      <button onClick={toggleMenuMovil} className="btn-menu d-lg-none">
        <MenuIcon className="icon-menu color-font mb-1" />
      </button>
      <Logo logo="/img/brand/logo.png" alt="elxr" />
      <div className="w-100 row mx-4 d-none d-md-flex">
        {router.asPath === "/" ? (
          <>
            <div className="col-3 d-flex align-items-center">
              <DiscoverMenu open={open} setOpen={setOpen} />
            </div>
            <div className="col-7 p-0">
              <InputSearch
                placeholder="Search for Channels, Events, Video, Podcasts and more..."
                value={search}
                setValue={setSearch}
              />
            </div>{" "}
          </>
        ) : null}
      </div>

      {auth && <MenuHeader user={user} />}
      {!auth && <AuthButtons />}
    </header>
  );
}

export default MainHeader;
