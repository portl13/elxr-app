import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useCookie } from "react-use";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [value, updateCookie, deleteCookie] = useCookie("is-new");
  const [isNew, setIsNew] = useState(false);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
      setAuth(true);
      if (value && !isNew) {
          console.log('user is new')
        setIsNew(true);
        setUser({
          ...session.user,
          rol: "vendor",
        });
      }
    }
  }, [status, session, value]);

  return (
    <UserContext.Provider
      value={{
        user,
        auth,
        setUser,
        setAuth,
        updateCookie,
        deleteCookie,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
