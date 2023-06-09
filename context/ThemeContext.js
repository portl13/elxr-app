import { createContext } from "react";
import { useLocalStorage } from "react-use";

export const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const [theme, changeTheme] = useLocalStorage("theme", "daylight");
  return (
    <ThemeContext.Provider value={{ theme:'daylight', changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
