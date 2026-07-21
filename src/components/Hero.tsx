"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

function useTypewriter(lines: string[], speed = 20) {
  const [output, setOutput] = useState("");
  const full = lines.join("\n");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setOutput(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [full, speed]);
  return output;
}

function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return { ref, handleMouseMove, handleMouseLeave };
}

export default function Hero() {
  const [isZoomed, setIsZoomed] = useState(false);
  const magneticWork = useMagnetic();
  const magneticContact = useMagnetic();

  const typed = useTypewriter([
    "const developer = {",
    "  name: \"Anjana\",",
    "  role: \"Full-Stack Developer\",",
    "  passion: \"Building modern web applications with AI-powered tools\"",
    "};"
  ], 20);

  const socials = [
    {
      name: "GitHub",
      url: "https://github.com/ILLANGASINGHE-AMB",
      color: "#f0f6fc",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/anjana-ilangasinghe-436936300?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
      color: "#0077b5",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
    {
      name: "Reddit",
      url: "https://www.reddit.com/user/RocCo227/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button",
      color: "#ff4500",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.37-4.31 3.81.81c.02.83.69 1.52 1.53 1.52 1.1 0 2-2 2-2 .83 0 1.52-.69 1.52-1.52S21.83 1 21 1c-.72 0-1.33.51-1.49 1.19l-4.22-.9c-.17-.04-.34.04-.41.2L13.3 6.36c-2.54.04-4.85.69-6.55 1.72-.56-.76-1.46-1.24-2.42-1.24-1.65 0-3 1.35-3 3 0 1.09.59 2.03 1.47 2.55-.05.21-.08.43-.08.66 0 3.31 4.03 6 9 6s9-2.69 9-6c0-.22-.03-.44-.08-.65.88-.51 1.48-1.45 1.48-2.56zM6 12.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm11.5 4.5c-1.84 0-3.32-1.16-3.75-2.5-.03-.09-.1-.14-.19-.14h-.12c-.09 0-.16.05-.19.14-.43 1.34-1.91 2.5-3.75 2.5-.09 0-.17.06-.2.15l-.04.13c-.04.12.04.25.16.27 2.19.34 4.52.34 6.71 0 .12-.02.2-.15.16-.27l-.04-.13c-.03-.09-.11-.15-.2-.15zm-.5-4.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ajn_ilgsh?igsh=ZjBtd2h5dXM0amhm&utm_source=qr",
      color: "#e1306c",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/94712016859",
      color: "#25d366",
      icon: (
        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.615-.49-5.181-1.417l-.371-.22-3.854.992 1.026-3.743-.243-.385C2.453 15.495 1.94 13.567 1.94 11.5c0-5.549 4.511-10.06 10.06-10.06 2.688 0 5.215 1.048 7.116 2.95 1.901 1.901 2.948 4.428 2.948 7.11 0 5.549-4.512 10.06-10.06 10.06m8.528-18.588C18.258 1.037 15.26 0 12.051 0 5.405 0 .004 5.399.004 12.045c0 2.12.553 4.19 1.603 6.01L0 24l6.096-1.599c1.765.962 3.755 1.47 5.955 1.47 6.645 0 12.046-5.4 12.046-12.046 0-3.21-1.249-6.228-3.518-8.497" />
        </svg>
      ),
    },
  ];

  return (
    <section id="hero" className={styles.heroSection}>
      <div className="glow-blur" style={{ top: "10%", left: "15%", background: "var(--accent-primary)" }}></div>
      <div className="glow-blur" style={{ bottom: "20%", right: "10%", background: "var(--accent-cyan)" }}></div>

      <div className={`${styles.heroContainer} container`}>
        {/* Top Row: Avatar and Code Card */}
        <div className={styles.topRow}>
          <div className={styles.profileArea}>
            <div 
              className={styles.profileImageContainer}
              onClick={() => setIsZoomed(true)}
              title="Click to zoom"
            >
              <Image
                src="/newPfP.jpeg"
                alt="Anjana Profile Picture"
                width={150}
                height={150}
                className={styles.profileImage}
                priority
              />
            </div>
            <div className={styles.greetingBadge}>
              <span className={styles.badgePulse}></span>
              Available for new opportunities
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={`${styles.terminalMockup} glass-card`}>
              <div className={styles.terminalHeader}>
                <span className={styles.terminalButton} style={{ background: "#ef4444" }}></span>
                <span className={styles.terminalButton} style={{ background: "#eab308" }}></span>
                <span className={styles.terminalButton} style={{ background: "#22c55e" }}></span>
                <span className={styles.terminalTitle}>developer.ts</span>
              </div>
              <div className={styles.terminalBody}>
                <pre className={styles.codeBlock}>
                  <code>
                    {typed}
                    <span className={styles.cursorBlink}>█</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Text content and CTA buttons */}
        <div className={styles.bottomContent}>
          <h1 className={styles.title}>
            Hi, I am <span className={styles.highlightText}>Anjana</span>
          </h1>

          <div className={styles.subtitleContainer}>
            <span className={styles.subtitleLine}></span>
            <h2 className={styles.subtitle}>ICT Undergraduate &amp; Full-Stack Developer</h2>
            <span className={styles.subtitleLine}></span>
          </div>

          <p className={styles.description}>
            I am an undergraduate in Information and Communication Technology with a passion for building modern web applications.
            <br className={styles.desktopOnlyBr} />
            I enjoy combining clean development practices and AI-powered tools to create efficient and engaging digital experiences.
          </p>

          <div className={styles.ctaGroup}>
            <a
              ref={magneticWork.ref}
              onMouseMove={magneticWork.handleMouseMove}
              onMouseLeave={magneticWork.handleMouseLeave}
              href="#industry-projects"
              className="btn btn-primary"
              id="hero-view-work-btn"
              style={{ transition: "transform 0.15s ease" }}
            >
              View My Work
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a
              ref={magneticContact.ref}
              onMouseMove={magneticContact.handleMouseMove}
              onMouseLeave={magneticContact.handleMouseLeave}
              href="#contact"
              className="btn btn-secondary"
              id="hero-contact-btn"
              style={{ transition: "transform 0.15s ease" }}
            >
              Get In Touch
            </a>
          </div>

          {/* Social icons visible on Mobile layout */}
          <div className={styles.mobileSocials}>
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileSocialLink}
                style={{ "--accent-hover": social.color } as React.CSSProperties}
                aria-label={`Mobile ${social.name}`}
                id={`hero-social-${social.name.toLowerCase()}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {isZoomed && (
        <div className={styles.lightboxOverlay} onClick={() => setIsZoomed(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <Image
              src="/newPfP.jpeg"
              alt="Anjana Profile Picture Zoomed"
              width={400}
              height={400}
              className={styles.zoomedImage}
              priority
            />
            <button className={styles.closeButton} onClick={() => setIsZoomed(false)} aria-label="Close zoom view">
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
