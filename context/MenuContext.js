import { createContext, useContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState();
  return (
    <MenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        openMenu,
        setOpenMenu,
        openSearch,
        setOpenSearch,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;

export const useMenu = () => {
  const {
    showMobileMenu = false,
    setShowMobileMenu,
    openMenu,
    setOpenMenu,
    openSearch,
    setOpenSearch,
  } = useContext(MenuContext);
  const toggle = () => setShowMobileMenu(!showMobileMenu);
  const toggleMenuMovil = () => setOpenMenu(!openMenu);
  const toggleSearch = () => setOpenSearch(!openSearch);
  return {
    show: showMobileMenu,
    setShow: setShowMobileMenu,
    toggleMenu: toggle,
    toggleMenuMovil,
    openMenu,
    openSearch,
    toggleSearch,
  };
};
