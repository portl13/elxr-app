import React, { useContext, useState } from "react";
import { UserContext } from "@context/UserContext";
import MenuHeader from "@components/home/MenuHeader";
import AuthButtons from "@components/home/AuthButtons";
import Logo from "@components/layout/Logo";
import DiscoverMenu from "./menus/DiscoverMenu";
import InputSearch from "@components/ui/inputs/InputSearch";
import {ChannelContext} from "@context/ChannelContext";

function MainHeader() {
  const {setSearch, search} = useContext(ChannelContext);
  const { user, auth } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  return (
    <header className="header z-index-3 d-flex justify-content-between">
      <Logo logo="/img/brand/logo.png" alt="Portl" />
      <div className="w-100 row mx-4 d-none d-md-flex">
        <div className="col-3 d-flex align-items-center">
          <DiscoverMenu open={open} setOpen={setOpen} />
        </div>
        <div className="col-7 p-0">
          <InputSearch
            placeholder="Search for Channels, Events, Video, Podcasts and more..."
            value={search}
            setValue={setSearch}
          />
        </div>
      </div>

      {auth && <MenuHeader user={user} />}
      {!auth && <AuthButtons />}
    </header>
  );
}

export default MainHeader;
