import Navbar from "@/components/Navbar";
import SocialFloatingBar from "@/components/SocialFloatingBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.appWrapper}>
      <CustomCursor />
      <ScrollProgress />
      <div className="cyberGrid" aria-hidden="true" />
      
      <Loader />
      <Navbar />
      <SocialFloatingBar />
      
      <main className={styles.main}>
        <Hero />
        <About />
        <Projects type="industry" />
        <Projects type="featured" />
        <Experience />
        <Contact />
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.footerContainer} container`}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Anjana. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
