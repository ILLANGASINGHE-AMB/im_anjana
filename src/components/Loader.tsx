"use client";

import { useState, useEffect } from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    let timer: NodeJS.Timeout;
    const startTime = Date.now();
    const duration = 2000; // Total duration in ms

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(calculatedProgress);

      if (calculatedProgress < 100) {
        timer = setTimeout(updateProgress, 30);
      } else {
        // Wait briefly before starting fade out
        timer = setTimeout(() => {
          setIsFadingOut(true);
          // Wait for fadeout animation to finish before unmounting
          timer = setTimeout(() => {
            setShouldRender(false);
          }, 600); // matches the transition time in css
        }, 400);
      }
    };

    timer = setTimeout(updateProgress, 30);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`${styles.loaderOverlay} ${isFadingOut ? styles.fadeOut : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.logoBracket}>&lt;AJN/&gt;</div>

        <h2 className={styles.loadingText}>
          Loading into Ilangasinghe.Jr&apos;s Portfolio
        </h2>

        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className={styles.percentage}>
          {progress}%
        </div>
      </div>
    </div>
  );
}
