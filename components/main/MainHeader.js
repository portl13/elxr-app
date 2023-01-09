import React, { useContext, useState } from "react";
import { css } from "@emotion/core"; 
import { UserContext } from "@context/UserContext";
import MenuHeader from "@components/home/MenuHeader";
import AuthButtons from "@components/home/AuthButtons";
import Logo from '@components/layout/Logo';
import DiscoverMenu from "./menus/DiscoverMenu";
import InputSearch from "@components/ui/inputs/InputSearch";

const headerStyle = css`
  .menu-container {
    list-style: none;
    padding-left: 0;
  }
  .menu-item {
    margin-left: 20px;
  }
  .menu-item a {
    color: var(--typo);
  }
  .menu-title {
    font-size: 12px;
  }
  .menu-icon svg {
    height: 18px;
  }
  @media (max-width: 1199px) {
    .center-icon {
      display: flex;
      align-items: center;
    }
  }
  .left-header {
    display: flex;
  }
`;

function MainHeader() {
  const { user, auth } = useContext(UserContext);
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <header css={headerStyle} className="header z-index-3 d-flex justify-content-between">
        <Logo width={200} height={45} logo="/img/brand/logo.png" alt="PORTL" />

        <div className="w-100 row mx-4">
            <div className="col-3 d-flex align-items-center">
                <DiscoverMenu open={open} setOpen={setOpen} />
            </div>
            <div className="col-7 p-0">
                <InputSearch 
                    placeholder='Search for Channels, Events, Video, Podcasts and more...'
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
