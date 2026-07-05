"use client";

import { useState } from "react";
import styles from "./Contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg("Please fill in all fields.");
      setStatusType("error");
      return;
    }

    setIsSubmitting(true);
    setStatusMsg("");
    setStatusType("");

    // Simulate API call
    try {
      const response = await fetch("https://formsubmit.co/ajax/anjanamalith2004@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`
        })
      });

      if (response.ok) {
        setStatusMsg("Thank you! Your message has been sent. On your first submission, please look out for an activation email from FormSubmit to verify your inbox.");
        setStatusType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setStatusMsg("Something went wrong. Please try again.");
      setStatusType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="glow-blur" style={{ bottom: "5%", right: "15%", background: "var(--accent-secondary)" }}></div>
      <div className={`${styles.contactContainer} container`}>
        <h2 className="section-title">Get In Touch</h2>

        <div className={`${styles.contactCard} glass-card`}>
          <div className={styles.contactInfo}>
            <h3 className={styles.contactSubtitle}>Let&apos;s create something legendary.</h3>
            <p className={styles.contactText}>
              Have a project in mind, want to collaborate, or just want to say hi?
              Drop me a message and I&apos;ll get back to you as soon as possible.
            </p>
            <div className={styles.directLinks}>
              <div className={styles.linkItem}>
                <span className={styles.linkIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <span className={styles.linkValue}>anjanamalith2004@gmail.com</span>
              </div>
              <div className={styles.linkItem}>
                <span className={styles.linkIcon}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                <span className={styles.linkValue}>Colombo, Sri Lanka</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
            <div className={styles.formGroup}>
              <label htmlFor="form-name" className={styles.formLabel}>Name</label>
              <input
                type="text"
                id="form-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="form-email" className={styles.formLabel}>Email</label>
              <input
                type="email"
                id="form-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={styles.formInput}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="form-message" className={styles.formLabel}>Message</label>
              <textarea
                id="form-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your project or ideas..."
                rows={5}
                className={styles.formInput}
                required
              ></textarea>
            </div>

            {statusMsg && (
              <div className={`${styles.statusMessage} ${statusType === "success" ? styles.statusSuccess : styles.statusError}`}>
                {statusMsg}
              </div>
            )}

            <button
              type="submit"
              className={`${styles.submitBtn} btn btn-primary`}
              disabled={isSubmitting}
              id="form-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <span className={styles.loader}></span>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
