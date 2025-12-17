import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
      <span className={styles.label}>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
    </button>
  );
}
