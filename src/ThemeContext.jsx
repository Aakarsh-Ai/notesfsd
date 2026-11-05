
import React, { createContext, useState } from "react";

// Create context
export const ThemeContext = createContext();

// Provider component
export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState("light");

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
