import { useState } from "react";
import { useAudio } from "../context/SoundContext";

export const Contact = ({ profile, onShowToast }) => {
  const [submitted, setSubmitted] = useState(false);
  const { playSynth } = useAudio();

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.email).then(() => {
      onShowToast(`Copied ${profile.email} to clipboard!`);
      playSynth(850, "sine", 0.05);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    playSynth(950, "triangle", 0.1);
  };

  return (
    <section className="contact" id="contact" data-section-title="CONTACT">
      <div className="contact__grid">
        <div className="contact__intro">
          <p className="section-label">Initiate Contact — 007</p>
          <h2 className="contact__title">
            <span>LET'S BUILD</span><br />
            <span>SOMETHING</span><br />
            <span>ICONIC.</span>
          </h2>

          <div className="contact__actions mt-8">
            <button
              type="button"
              className="copy-email-btn"
              onClick={handleCopy}
              data-cursor="COPY"
            >
              <span className="icon">📋</span>
              <span>Copy Email Address</span>
            </button>
          </div>

          <div className="contact__links mt-8">
            {profile.socials.map((s) => (
              <a
                key={s.name}
                className="nav-action-btn"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="contact__form-panel">
          {!submitted ? (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <p className="contact-form__eyebrow">Send a direct message</p>
              <div className="contact-form__row">
                <label className="contact-field">
                  <span className="contact-field__label">Your Name</span>
                  <input type="text" required placeholder="Abdullah" />
                </label>
                <label className="contact-field">
                  <span className="contact-field__label">Email Address</span>
                  <input type="email" required placeholder="zillu.naj@gmail.com" />
                </label>
              </div>
              <label className="contact-field">
                <span className="contact-field__label">Project Scope / Budget</span>
                <input type="text" placeholder="Web Application, Web Development, etc." />
              </label>
              <label className="contact-field">
                <span className="contact-field__label">Message</span>
                <textarea rows="4" required placeholder="Describe what you want to build..."></textarea>
              </label>
              <button type="submit" className="contact-form__submit" data-cursor="SEND">
                <span>Send Message</span>
                <span aria-hidden="true">→</span>
              </button>
            </form>
          ) : (
            <div className="contact-success" role="status">
              <div className="text-accent text-5xl mb-3">✓</div>
              <p className="text-xl font-display font-bold">Message Received</p>
              <p className="text-mute text-sm mt-1">Thanks for reaching out. I’ll reply within 24 hours.</p>
              <button
                type="button"
                className="contact-success__again mt-4"
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};