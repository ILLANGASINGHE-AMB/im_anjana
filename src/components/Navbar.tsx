"use client";

import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = (localStorage.getItem("theme") as "dark" | "light") || "dark";
      const timer = setTimeout(() => {
        setTheme(savedTheme);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`${styles.navContainer} container`}>
        <a href="#hero" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoText}>ANJANA</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </a>

        <button 
          className={`${styles.mobileToggle} ${isOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.navMenu} ${isOpen ? styles.menuOpen : ""}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#about" className={styles.navLink} onClick={closeMenu}>
                About
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#industry-projects" className={styles.navLink} onClick={closeMenu}>
                Industry Projects
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#projects" className={styles.navLink} onClick={closeMenu}>
                Featured Projects
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#experience" className={styles.navLink} onClick={closeMenu}>
                Experience
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#contact" className={styles.navLink} onClick={closeMenu}>
                Contact
              </a>
            </li>
            <li className={styles.themeToggleItem}>
              <button
                onClick={toggleTheme}
                className={styles.themeToggleBtn}
                aria-label="Toggle Theme"
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
              >
                {theme === "light" ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>
            </li>
            <li className={styles.navCTA}>
              <a href="#contact" className="btn btn-primary" onClick={closeMenu} id="nav-cta-btn">
                Let&apos;s Chat
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
