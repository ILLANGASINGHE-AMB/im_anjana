"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import Reveal from "./Reveal";

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

        <Reveal>
          <div className={`${styles.contactCard} glass-card`}>
            <div className={styles.contactInfo}>
              <h3 className={styles.contactSubtitle}>Let&apos;s create something legendary.</h3>
              <p className={styles.contactText}>
                Have a project in mind, want to collaborate, or just want to say hi?
                Drop me a message and I&apos;ll get back to you as soon as possible.
              </p>
              <div className={styles.directLinks}>
                <a href="mailto:anjanamalith2004@gmail.com" className={styles.linkItem}>
                  <span className={styles.linkIcon}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span className={styles.linkValue}>anjanamalith2004@gmail.com</span>
                </a>
                <a href="https://wa.me/94712016859" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>
                  <span className={styles.linkIcon} style={{ color: "#25d366", borderColor: "rgba(37, 211, 102, 0.3)", background: "rgba(37, 211, 102, 0.08)" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.826 0-3.615-.49-5.181-1.417l-.371-.22-3.854.992 1.026-3.743-.243-.385C2.453 15.495 1.94 13.567 1.94 11.5c0-5.549 4.511-10.06 10.06-10.06 2.688 0 5.215 1.048 7.116 2.95 1.901 1.901 2.948 4.428 2.948 7.11 0 5.549-4.512 10.06-10.06 10.06m8.528-18.588C18.258 1.037 15.26 0 12.051 0 5.405 0 .004 5.399.004 12.045c0 2.12.553 4.19 1.603 6.01L0 24l6.096-1.599c1.765.962 3.755 1.47 5.955 1.47 6.645 0 12.046-5.4 12.046-12.046 0-3.21-1.249-6.228-3.518-8.497" />
                    </svg>
                  </span>
                  <span className={styles.linkValue}>+94 71 201 6859</span>
                </a>
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
        </Reveal>
      </div>
    </section>
  );
}
