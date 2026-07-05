"use client";

import styles from "./Experience.module.css";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  employmentType: string;
  workMode: string;
  description: string;
  skills: string[];
}

export default function Experience() {
  const items: TimelineItem[] = [
    {
      year: "September 2024 – Present",
      role: "Full-stack Developer",
      company: "Self-employed",
      employmentType: "Self-employed",
      workMode: "Remote",
      description: "As a self-employed Full Stack Developer, I design, develop, and maintain responsive web applications and solutions, working with clients to turn conceptual designs into live projects.",
      skills: ["Full-Stack Development", "Node.js"],
    },
    {
      year: "January 2024 – January 2026",
      role: "System Developer & Database Manager",
      company: "Sagacious Holdings",
      employmentType: "Contract",
      workMode: "Hybrid",
      description: "Responsible for core software system development and managing database management systems (DBMS) to optimize performance, reliability, and security of company assets.",
      skills: ["Software Development", "Database Management System (DBMS)"],
    },
    {
      year: "February 2020 – January 2024",
      role: "Android Systems Developer & Device Software Specialist",
      company: "Sony Mobile LK (Community Group)",
      employmentType: "Self-employed",
      workMode: "Remote",
      description: "Contributed to Android system development, device software customization, testing kernel optimizations, and compiling customized operating system builds.",
      skills: ["Android Development", "Operating Systems"],
    },
  ];

  return (
    <section id="experience" className="section">
      <div className="glow-blur" style={{ bottom: "10%", left: "5%", background: "var(--accent-primary)" }}></div>
      <div className={`${styles.experienceContainer} container`}>
        <h2 className="section-title">My Journey</h2>
        
        <div className={styles.timeline}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.timelineItem} id={`timeline-item-${idx}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineHeaderBlock}>
                  <span className={styles.timelineYear}>{item.year}</span>
                  <span className={styles.timelineMeta}>
                    {item.employmentType} &bull; {item.workMode}
                  </span>
                </div>
                <h3 className={styles.timelineRole}>
                  {item.role} <span className={styles.timelineCompany}>@ {item.company}</span>
                </h3>
                <p className={styles.timelineDesc}>{item.description}</p>
                <div className={styles.timelineSkills}>
                  {item.skills.map((skill, sIdx) => (
                    <span key={sIdx} className={styles.skillBadge}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
