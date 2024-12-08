import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const AvaliableThemes = ["Light , Dark  , HightContrast"];

    // Get user's preferred theme from localStorage or default to the browser's preference
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }

        // Check for the user's system preference
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (userPrefersDark) {
            return 'Dark'; // If the system prefers dark mode
        } else {
            return 'Dark'; // If the system prefers light mode or no preference is set
        }
    };

    const [currentTheme, setCurrentTheme] = useState(getInitialTheme);


    // Effect to update theme in localStorage and apply to the body when currentTheme changes
    useEffect(() => {
        console.table('currentTheme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        document.body.setAttribute('data-theme', currentTheme); // Apply the data-theme attribute to the body
    }, [currentTheme]);

     // Listen for changes to localStorage in other tabs/windows
     useEffect(() => {
        const handleStorageChange = () => {
            const themeFromStorage = localStorage.getItem('theme');
            if (themeFromStorage && themeFromStorage !== currentTheme) {
                setCurrentTheme(themeFromStorage);
            }
        };

        // Set up the event listener
        window.addEventListener('storage', handleStorageChange);

        // Cleanup the listener on component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [currentTheme]);



    // Function to change the theme
    const changeTheme = (theme) => {
        setCurrentTheme(theme);
    };


    return (
        <>
            <ThemeContext.Provider value={{ currentTheme, changeTheme, AvaliableThemes }}>
                {children}
            </ThemeContext.Provider>

        </>
    )
}



export { ThemeContext, ThemeProvider }