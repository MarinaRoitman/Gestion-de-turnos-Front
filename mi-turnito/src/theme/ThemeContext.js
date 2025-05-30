// src/theme/ThemeContext.js
import { createContext, useContext, useState } from 'react';
import { LightTheme, DarkTheme } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
const [isDark, setIsDark] = useState(false);

const toggleTheme = () => setIsDark(prev => !prev);

const theme = isDark ? DarkTheme : LightTheme;

return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
    {children}
    </ThemeContext.Provider>
);
};

export const useTheme = () => useContext(ThemeContext);
