import {createContext} from 'react'
import {useLocalStorage} from "react-use";

export const ThemeContext = createContext({})

function ThemeProvider({children}) {
    const [theme, changeTheme] = useLocalStorage('theme', 'midnigth');
    return (
        <ThemeContext.Provider  value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;