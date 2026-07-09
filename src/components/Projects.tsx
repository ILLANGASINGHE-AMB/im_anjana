"use client";

import { useRef } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./Projects.module.css";

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.2s ease", display: "flex", flexDirection: "column", height: "100%" }}
    >
      {children}
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectsProps {
  type: "featured" | "industry";
}

export default function Projects({ type }: ProjectsProps) {
  const featuredProjects: Project[] = [
    {
      title: "නිර්නාම (Nirnama)",
      description: "A fully anonymous, real-time message board where users can share thoughts in Sinhala and English under a cozy vintage typewriter theme. Built serverless with React and Supabase, it features grapheme-aware character counting (using browser-native Intl.Segmenter) for correct Sinhala Unicode boundary measurement, database-level security (RLS) policies, and client-side anti-spam gating.",
      image: "/nirnaama.png",
      tags: ["React (Vite)", "Tailwind CSS v4", "Supabase", "PostgreSQL RLS", "Real-time DB"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/Quoter.git",
      liveUrl: "https://nirnaama.netlify.app",
    },
    {
      title: "CampusConnect - Club & Event Manager",
      description: "A collaborative C# WPF desktop application developed by #TeamFreeWill to simplify university club, student membership, and event registration tracking. Integrates local SQLite data seeding, QR code ticket scanning, and PDF reports.",
      image: "/CC.png",
      tags: ["C#", ".NET 10 (WPF)", "SQLite", "QuestPDF", "MVVM"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/CampusConnect.git",
      liveUrl: "https://github.com/ILLANGASINGHE-AMB/CampusConnect.git",
    },
    {
      title: "HeLLL 3D - Voxel Model Generator",
      description: "An AI-powered web application that transforms natural language prompts into structured 3D voxel model concepts. Built with Vite and TypeScript, it integrates Google Gemini through the Google AI Studio API for real-time generative designs.",
      image: "/hell3d.jpg",
      tags: ["AI Web App", "Google Gemini API", "Vite", "TypeScript", "Google AI Studio"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/Helll_3DModel",
      liveUrl: "https://github.com/ILLANGASINGHE-AMB/Helll_3DModel",
    },
    {
      title: "Renewly - Subscription Manager",
      description: "An offline-first mobile application developed in Flutter to help users manage recurring subscriptions, track monthly expenses, and receive local renewal notifications without needing an internet connection.",
      image: "/renewly.jpg",
      tags: ["Flutter", "Dart", "Local Storage", "Git & GitHub"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/Renewly_App",
      liveUrl: "https://github.com/ILLANGASINGHE-AMB/Renewly_App",
    },
    {
      title: "Sagacious Ice Factory IMS",
      description: "A collaborative Java Swing desktop application developed for an ice manufacturing business to streamline inventory operations, customer order management, invoice generation, and sales reporting using structured OOP principles.",
      image: "/sagaice_java.png",
      tags: ["Java", "Java Swing", "OOP Principles", "File Handling"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/OOP_Project_TFW2.2.git",
      liveUrl: "https://github.com/ILLANGASINGHE-AMB/OOP_Project_TFW2.2.git",
    },
    {
      title: "MesCalc - Instrument Simulator",
      description: "A command-line scientific measurement calculator developed in C to simplify laboratory experiment calculations. Supports Vernier Calipers, Micrometer Screw Gauges, and Spherometers with modular function architecture and dynamic validation.",
      image: "/mescalc_screenshot.png",
      tags: ["C Programming", "Console UI", "Standard C Libraries"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/MesCalc---Measurement-Instrument-Simulator-in-C.git",
      liveUrl: "https://github.com/ILLANGASINGHE-AMB/MesCalc---Measurement-Instrument-Simulator-in-C.git",
    },
    {
      title: "Simple Glass Calculator",
      description: "A responsive web-based calculator showcasing a modern glassmorphism user interface with smooth interactions, providing essential arithmetic operations (+, −, ×, ÷), percentage calculations, decimal support, and convenient editing features.",
      image: "/simple_calculator.png",
      tags: ["HTML5", "CSS3 (Glassmorphism)", "JavaScript"],
      githubUrl: "https://github.com/ILLANGASINGHE-AMB/simpleCalc.git",
      liveUrl: "/projects/simple%20calculator/simplecalulator.html",
    },
  ];

  const industryProjects: Project[] = [
    {
      title: "Sagacious ICE Factory Management System",
      description: "A modern, full-stack web application developed to centralize inventory monitoring, sales tracking, invoice processing, and customer debt records. Built with React and powered by Supabase, it supports PDF invoice exports, WhatsApp notifications, and business reporting.",
      image: "/saga_ice_photo.png",
      tags: ["React (Vite)", "TypeScript", "Tailwind CSS", "Supabase", "jsPDF", "Recharts"],
      githubUrl: "",
      liveUrl: "",
    },
    {
      title: "SWC Laundry Management System",
      description: "A dual-platform business automation system combining a web administration dashboard and a mobile Android app. Syncs in real time via Supabase to track orders, manage driver routing, auto-generate invoices, and export sales reports.",
      image: "/swc_photo.png",
      tags: ["HTML/CSS/JS (Web)", "Android Studio (Mobile)", "Supabase (PostgreSQL)"],
      githubUrl: "",
      liveUrl: "",
    },
  ];

  const renderProjectGrid = (projectList: Project[], isFeatured = false) => {
    if (projectList.length === 0) {
      return (
        <div className={styles.comingSoonBlock}>
          <div className={styles.comingSoonLoader}></div>
          <p className={styles.comingSoonText}>Industry Systems</p>
        </div>
      );
    }

    return (
      <div className={styles.projectsGrid}>
        {projectList.map((project, idx) => (
          <Reveal key={idx} delay={idx * 0.15}>
            <TiltCard>
              <article
                className={`${styles.projectCard} glass-card`}
                id={`project-card-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={500}
                    className={styles.projectImage}
                    priority={isFeatured && idx === 0}
                  />
                  <div className={styles.imageOverlay}>
                    <div className={styles.overlayLinks}>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.iconLink} btn`}
                          aria-label={`${project.title} GitHub`}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                          </svg>
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${styles.iconLink} btn`}
                          aria-label={`${project.title} Live Demo`}
                        >
                          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          Demo
                        </a>
                      )}
                      {!project.githubUrl && !project.liveUrl && (
                        <span className={styles.internalBadge}>
                          Internal / In Use System
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>
                  <div className={styles.tagsContainer}>
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className={styles.projectTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    );
  };

  if (type === "industry") {
    return (
      <section id="industry-projects" className="section">
        <div className="glow-blur" style={{ top: "20%", right: "5%", background: "var(--accent-secondary)" }}></div>
        <div className={`${styles.projectsContainer} container`}>
          <h2 className="section-title">Industry - In Use Systems</h2>
          {renderProjectGrid(industryProjects)}
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section">
      <div className="glow-blur" style={{ bottom: "25%", left: "5%", background: "var(--accent-cyan)" }}></div>
      <div className={`${styles.projectsContainer} container`}>
        <h2 className="section-title">Featured Projects</h2>
        {renderProjectGrid(featuredProjects, true)}
      </div>
    </section>
  );
}
