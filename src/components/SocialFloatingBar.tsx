"use client";

import styles from "./SocialFloatingBar.module.css";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

export default function SocialFloatingBar() {
  const socials: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/ILLANGASINGHE-AMB",
      color: "#f0f6fc",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anjana-ilangasinghe-436936300?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      color: "#0077b5",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Reddit",
      url: "https://www.reddit.com/user/RocCo227/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button",
      color: "#ff4500",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.37-4.31 3.81.81c.02.83.69 1.52 1.53 1.52 1.1 0 2-2 2-2 .83 0 1.52-.69 1.52-1.52S21.83 1 21 1c-.72 0-1.33.51-1.49 1.19l-4.22-.9c-.17-.04-.34.04-.41.2L13.3 6.36c-2.54.04-4.85.69-6.55 1.72-.56-.76-1.46-1.24-2.42-1.24-1.65 0-3 1.35-3 3 0 1.09.59 2.03 1.47 2.55-.05.21-.08.43-.08.66 0 3.31 4.03 6 9 6s9-2.69 9-6c0-.22-.03-.44-.08-.65.88-.51 1.48-1.45 1.48-2.56zM6 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11.5 4.5c-1.84 0-3.32-1.16-3.75-2.5-.03-.09-.1-.14-.19-.14h-.12c-.09 0-.16.05-.19.14-.43 1.34-1.91 2.5-3.75 2.5-.09 0-.17.06-.2.15l-.04.13c-.04.12.04.25.16.27 2.19.34 4.52.34 6.71 0 .12-.02.2-.15.16-.27l-.04-.13c-.03-.09-.11-.15-.2-.15zm-.5-4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ajn_ilgsh?igsh=ZjBtd2h5dXM0amhm&utm_source=qr",
      color: "#e1306c",
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ];

  return (
    <div className={styles.socialBar}>
      <ul className={styles.socialList}>
        {socials.map((social) => (
          <li key={social.name} className={styles.socialItem}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              style={{ "--accent-hover": social.color } as React.CSSProperties}
              aria-label={social.name}
              id={`social-link-${social.name.toLowerCase()}`}
            >
              {social.icon}
              <span className={styles.tooltip}>{social.name}</span>
            </a>
          </li>
        ))}
        <li className={styles.verticalLine}></li>
      </ul>
    </div>
  );
}
