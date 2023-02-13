import { Nav, NavItem } from "reactstrap";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import useIcon from "../../hooks/useIcon";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/loader";
import Logo from "./Logo";
import HamburgerButton from "../ui/button/HamburgerButton";
import { css } from '@emotion/core';

const SignInButton = () => {
  const handleRegister = () => {
    Router.push("/login");
  };
  return (
    <button onClick={() => handleRegister()} className="btn btn-primary">
      Sign In
    </button>
  );
};
const SignUpButton = () => {
  const handleRegister = () => {
    //Router.push('/register');
    Router.push("/signup");
  };
  return (
    <button onClick={() => handleRegister()} className="btn btn-secundary">
      Sign Up
    </button>
  );
};

const MenuButton = () => {
  const { iconElement: menuIcon } = useIcon(faBars);
  return (
    <NavItem className="d-flex align-items-center" css={{ width: 20}}>
      {menuIcon}
    </NavItem>
  )
}

const ContainerNav = () => {

  const { user } = useContext(UserContext);
  const [data, setData] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(true);
  const profile = process.env.bossApi + "/members/";
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  useEffect(() => {
    if (user) {
      setLoader(!user);
    }
  }, [user]);
  function getUser() {
    axios
      .get(profile + user?.id, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then((res) => {
        setData(res.data);
        setImage(res.data.avatar_urls.thumb);
      });
  }
  const getbutton = () => {
    if (loader && user !== null) return <Loader />;
    if (user && !loader)
      return (
        <>
          <NavItem className="d-flex align-items-center justify-content-end">
            <div className="nav-username mr-2">{user && user.displayName}</div>
            <div className="nav-avatar">
              <img
                className="avatar"
                src={image ? image : user?.avatar_urls?.thumb}
                alt={`avatar ${user?.displayName}`}
              />
            </div>
          </NavItem>
        </>
      );
    if (user === null)
      return (
        <li className="nav-item d-flex align-items-center justify-content-end">
          <SignInButton />
          <SignUpButton />
        </li>
      );
  };
  return (
    <Nav css={css`
      display: grid;
      grid-template-columns: 1fr 150px 1fr;
      width: 100%;
      padding-top: 10px;
    `}>
      <MenuButton />
      <Logo logo="/img/brand/logo.png" alt="elxr" />
      {getbutton()}
    </Nav>
  );
};
export default ContainerNav;