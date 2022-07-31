import { createContext, useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('user', null)
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    if (!user) return
    setAuth(!auth)
  }, [user])

  useEffect(() => {
    if (!user && auth) {
      setAuth(!auth)
    }
  }, [user])

  return (
    <UserContext.Provider
      value={{
        user,
        auth,
        setUser,
        setAuth,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
