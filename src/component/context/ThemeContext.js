import React, { createContext, useEffect, useState } from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) =>{
    const [isDarkMode, setIsDarkMode] = useState(false);  

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);  
    };

    useEffect(()=>{
        const body = document.body;
        if(isDarkMode){
            body.classList.add('dark-mode')
        }else{
            body.classList.remove('dark-mode');
        }
    },[isDarkMode]);

    return(
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
        {children}  
        </ThemeContext.Provider>
    )

}

