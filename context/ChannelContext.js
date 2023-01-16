import { createContext, useState } from "react";
import useDebounce from "@hooks/useDebounce";

export const ChannelContext = createContext({});

const ChannelProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  const debounceTerm = useDebounce(search, 500);

  return (
    <ChannelContext.Provider
      value={{
        setSearch,
        debounceTerm,
        search,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
