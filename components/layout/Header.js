import React from "react";
import { Navbar } from "reactstrap";
import { css } from "@emotion/core";
import ContainerFullWidth from "./ContainerFullWidth";
import ContainerNav from "./ContainerNav";
import InputSearch from "../ui/inputs/InputSearch";
import Logo from "./Logo";
const Header = ({ actionButton }) => {
  return (
    <>
      <header className="primary-header">
        <Navbar
          className="singup-process-header"
          css={css`
              & .container{
                padding-top: .5rem;
              }
          `}
          expand="md"
        >
          <ContainerFullWidth>
            <Logo logo="/img/brand/logo.png" alt="PORTL" />
          </ContainerFullWidth>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
