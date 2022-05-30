import { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';


export const ChannelContext = createContext();

const ChannelProvider = ({ children }) => {
    const [data, setData] =
    useState([])
    //  useLocalStorage('channel', []);
    return (
        <ChannelContext.Provider
            value={{
                data,
                setData
            }}
        >
            {children}
        </ChannelContext.Provider>
    );
}

export default ChannelProvider;
