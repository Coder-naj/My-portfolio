import { createContext, useContext, useLayoutEffect, useMemo, useState } from "react";

// ids match the body[data-theme="..."] rules in index.css
// Shared configuration is intentionally exported from this context module.
// eslint-disable-next-line react-refresh/only-export-components
export const THEMES = [
  { id: "gold", label: "Gold", color: "#f2c94c" },
  { id: "emerald", label: "Emerald", color: "#10b981" },
  { id: "cyan", label: "Cyan", color: "#06b6d4" },
  { id: "violet", label: "Violet", color: "#a855f7" },
];

const STORAGE_KEY = "portfolio-theme";
const DEFAULT_ID = "violet";
const ThemeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return THEMES.some((t) => t.id === saved) ? saved : DEFAULT_ID;
    } catch {
      return DEFAULT_ID;
    }
  });

  const theme = THEMES.find((t) => t.id === themeId) || THEMES[3];

  useLayoutEffect(() => {
    document.body.dataset.theme = theme.id;
    try {
      localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const value = useMemo(
    () => ({ themes: THEMES, theme, themeId, setThemeId, accent: theme.color }),
    [theme, themeId]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}