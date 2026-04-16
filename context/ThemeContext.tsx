import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTheme, saveTheme } from '../services/settings';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    bg: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    inputBg: string;
  };
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colors: {
    bg: 'bg-gray-100',
    card: 'bg-white',
    text: 'text-gray-900',
    textSecondary: 'text-gray-500',
    border: 'border-gray-300',
    inputBg: 'bg-white',
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    getTheme().then(setTheme);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    saveTheme(next);
  };

  const colors =
    theme === 'dark'
      ? {
          bg: 'bg-gray-900',
          card: 'bg-gray-800',
          text: 'text-white',
          textSecondary: 'text-gray-400',
          border: 'border-gray-600',
          inputBg: 'bg-gray-700',
        }
      : {
          bg: 'bg-gray-100',
          card: 'bg-white',
          text: 'text-gray-900',
          textSecondary: 'text-gray-500',
          border: 'border-gray-300',
          inputBg: 'bg-white',
        };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
