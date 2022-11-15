import { createContext, useContext, useState } from "react";

export const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <MenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        openMenu,
        setOpenMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuProvider;

export const useMenu = () => {
  const { showMobileMenu = false, setShowMobileMenu, openMenu, setOpenMenu } = useContext(MenuContext);
  const toggle = () => setShowMobileMenu(!showMobileMenu);
  const toggleMenuMovil = () => setOpenMenu(!openMenu);
  return {
    show: showMobileMenu,
    setShow: setShowMobileMenu,
    toggleMenu: toggle,
    toggleMenuMovil,
    openMenu,
  };
};
