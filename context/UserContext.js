import { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('user', null);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;
