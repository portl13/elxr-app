import { createContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useSession } from "next-auth/react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      console.log(session);
      setUser(session.user);
      setAuth(true);
    }
  }, [status, session]);

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
  );
};

export default UserProvider;
