"use client";

import styles from "./About.module.css";

interface SkillCategory {
  title: string;
  skills: string[];
  gradient: string;
}

export default function About() {
  const categories: SkillCategory[] = [
    {
      title: "Frontend Engineering",
      skills: ["React", "Next.js", "TypeScript", "Vanilla CSS", "HTML5/CSS3", "JavaScript"],
      gradient: "var(--accent-gradient-1)",
    },
    {
      title: "Backend & Systems",
      skills: ["Node.js", "Express", "RESTful APIs", "PostgreSQL", "SupaBase"],
      gradient: "var(--accent-gradient-2)",
    },
    {
      title: "DevOps & Tools",
      skills: ["Git & GitHub", "Vercel", "Vite"],
      gradient: "linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-primary) 100%)",
    },
  ];

  return (
    <section id="about" className="section">
      <div className={`${styles.aboutContainer} container`}>
        <h2 className="section-title">About Me</h2>

        <div className={styles.aboutContent}>
          <div className={styles.bioBlock}>
            <h3 className={styles.bioHeading}>Building innovative digital solutions with modern technologies and AI.</h3>
            <p className={styles.bioText}>
              Hello! I&apos;m an undergraduate pursuing a Bachelor of Information and Communication Technology (Honours) at the Faculty of Technology, University of Sri Jayewardenepura. I am passionate about software development, artificial intelligence, and building digital solutions that are both functional and user-friendly.
            </p>
            <p className={styles.bioText}>
              I actively leverage AI-powered tools throughout my development process to accelerate learning, improve productivity, and explore innovative approaches to problem-solving. By combining AI with strong technical fundamentals, I can rapidly prototype ideas, optimize workflows, and build high-quality applications more efficiently.
            </p>
            <p className={styles.bioText}>
              My interests include full-stack web development, software engineering, cloud technologies, and emerging AI applications. I enjoy turning ideas into practical solutions by writing clean, maintainable code and designing intuitive, responsive user experiences.
            </p>
            <p className={styles.bioText}>
              I believe technology is evolving rapidly, and embracing AI is an essential part of becoming a modern software developer. My goal is to continuously learn, adapt, and create impactful software that solves real-world problems while making the most of today&apos;s intelligent development tools.
            </p>
          </div>

          <div className={styles.skillsBlock}>
            <h3 className={styles.skillsHeading}>My Technical Arsenal</h3>
            <div className={styles.categoriesGrid}>
              {categories.map((cat, idx) => (
                <div key={idx} className={`${styles.categoryCard} glass-card`}>
                  <div className={styles.categoryHeader}>
                    <span
                      className={styles.colorIndicator}
                      style={{ background: cat.gradient }}
                    ></span>
                    <h4 className={styles.categoryTitle}>{cat.title}</h4>
                  </div>
                  <div className={styles.skillsTagWrapper}>
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
