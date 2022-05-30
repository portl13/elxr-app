import React, { useContext, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';
import { MenuContext } from '../../context/MenuContext';
import { SidebarWrapper } from '../ui/sidebar/SidebarWrapper';
import { SidebarItem } from '../ui/sidebar/SidebarItem';
import { UserContext } from '../../context/UserContext';
import { ROUTES } from '../../utils/routes';

const MovilWrapper = styled.div`
  width: 285px;
  position: fixed;
  top: 0;
  height: 100%;
  overflow-y: auto;
  transition: all 0.35s ease-in-out;
  z-index: 999;
  box-shadow: 0 2px 5px 0 rgba(27, 26, 26, 0.7);
  left: ${(props) => (props.show ? '0' : '-300px')};
  @media (max-width: 375px) {
    width: 270px;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

const PanelMenu = styled.div`
  background: #000;
  min-height: 100%;
  position: relative;
  padding: 25px 30px 60px;
  z-index: 11;
`;

const CloseOverlay = styled.div`
  cursor: pointer;
  display: block;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  transition: all 0s linear;
  background: rgba(27, 26, 26, 0.7);
  z-index: 1;
  opacity: ${(props) => (props.show ? '1' : '0')};
  left: ${(props) => (props.show ? '0' : '-100%')};
`;

const MenuMobile = () => {
  const { showMobileMenu, setShowMobileMenu } = useContext(MenuContext);
  const handlerPush = (url) => {
    setShowMobileMenu(!showMobileMenu);
    Router.push(url);
  };
  const { user, setUser } = useContext(UserContext);
  const [auth, setSuth] = useState(false);
  useEffect(() => {
    if (!user) return;
    setSuth(!auth);
  }, [user]);
  useEffect(() => {
    if (!user && auth) {
      setSuth(!auth);
    }
  }, [user]);
  const signOut = () => {
    try {
      setUser(null);
      Router.push('/');
    } catch (error) {}
  };
  return (
    <>
      <MovilWrapper show={showMobileMenu}>
        <CloseOverlay
          show={showMobileMenu}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
        <PanelMenu>
          <SidebarWrapper>
            {ROUTES.map((ele) => {
              return (
                ((user && !ele.isPublic) || ele.isPublic) && (
                  <>
                    <SidebarItem
                      onClick={() =>
                        ele.name === "Logout"
                          ? signOut()
                          : handlerPush(ele.path)
                      }
                    >
                      <span className="sidebar-link">
                        <i className="sidebar-icon">
                          <FontAwesomeIcon icon={ele.icon} />
                        </i>
                        <span className="sidebar-text">{ele.name}</span>
                      </span>
                    </SidebarItem>
                  </>
                )
              );
            })}
          </SidebarWrapper>
        </PanelMenu>
      </MovilWrapper>
    </>
  );
};
export default MenuMobile;
