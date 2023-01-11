import { createContext, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useCookie } from "react-use";

export const UserContext = createContext({});

const UserProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [value, updateCookie, deleteCookie] = useCookie("is-new");
  const [userToken, updateUserJwt, deleteUserJwt] = useCookie("user-token");
  const [isNew, setIsNew] = useState(false);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session.user);
      setAuth(true);
      updateUserJwt(session.user.token);
      if (value && !isNew) {
        setIsNew(true);
        setUser({
          ...session.user,
          rol: "vendor",
        });
      }
    }
  }, [status, session, value]);

  const logOut = async () => {
    setUser(null);
    deleteCookie();
    deleteUserJwt();
    await signOut();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        auth,
        setUser,
        setAuth,
        updateCookie,
        deleteCookie,
        logOut,
        userToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
