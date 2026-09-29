import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useSound } from "../context/SoundContext";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

function scrollToHash(href) {
  const el = document.querySelector(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar({ brandName }) {
  const { themes, themeId, setThemeId } = useTheme();
  const { enabled, toggle, play } = useSound();
  const [open, setOpen] = useState(false);

  const setMenu = (next) => {
    setOpen(next);
    if (next) window.__lenis?.stop();
    else window.__lenis?.start();
  };

  const go = (e, href) => {
    e.preventDefault();
    play("click");
    if (open) setMenu(false);
    // wait a tick so the mobile menu unmounts before scrolling
    setTimeout(() => scrollToHash(href), open ? 50 : 0);
  };

  return (
    <>
      <header className="site-nav">
        <a href="#home" className="site-nav__brand" onClick={(e) => go(e, "#home")}>
          {brandName}
        </a>

        <nav className="site-nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link" onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="site-nav__actions">
          <button
            type="button"
            className="nav-action-btn"
            onClick={toggle}
            aria-pressed={enabled}
            aria-label={enabled ? "Turn sound off" : "Turn sound on"}
          >
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H3v6h3l5 4V5z" />
              {enabled ? (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
              ) : (
                <path d="m16 9 5 6m0-6-5 6" />
              )}
            </svg>
            <span>{enabled ? "Sound on" : "Sound off"}</span>
          </button>

          <div className="theme-switcher" role="radiogroup" aria-label="Accent colour">
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={themeId === t.id}
                aria-label={t.label}
                className={`theme-dot ${themeId === t.id ? "is-active" : ""}`}
                style={{ background: t.color, color: t.color }}
                onClick={() => {
                  setThemeId(t.id);
                  play("toggle");
                }}
              />
            ))}
          </div>

          <a href="#contact" className="nav-cta-btn" onClick={(e) => go(e, "#contact")}>
            Hire me
          </a>

          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setMenu(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className="mobile-menu">
          <nav className="mobile-menu__nav" aria-label="Mobile">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="mobile-nav-link" onClick={(e) => go(e, l.href)}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="theme-switcher" style={{ display: "flex", alignSelf: "flex-start" }}>
            {themes.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-label={t.label}
                className={`theme-dot ${themeId === t.id ? "is-active" : ""}`}
                style={{ background: t.color, color: t.color }}
                onClick={() => setThemeId(t.id)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
