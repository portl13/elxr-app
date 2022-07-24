import { createContext, useContext, useState } from 'react'

export const MenuContext = createContext()

const MenuProvider = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  return (
    <MenuContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  )
}

export default MenuProvider

export const useMenu = () => {
  const { showMobileMenu, setShowMobileMenu } = useContext(MenuContext)
  return {
    show: showMobileMenu,
    setShow: setShowMobileMenu,
  }
}
