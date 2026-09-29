import { useEffect, useState } from "react";
import { useSound } from "../context/SoundContext";

function formatClock(now, timeZone) {
  const zone = timeZone ? { timeZone } : {};
  try {
    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, ...zone,
    }).format(now);
    const offset =
      new Intl.DateTimeFormat("en-US", { timeZoneName: "shortOffset", ...zone })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value || "";
    return { time, offset };
  } catch {
    return { time: now.toLocaleTimeString("en-GB", { hour12: false }), offset: "" };
  }
}

function useClock(timeZone) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return formatClock(now, timeZone);
}

export function Hero({ profile }) {
  const { play } = useSound();
  const {
    name,
    image,
    availability = "Available for new projects",
    location,
    coordinates,
    timezone,
    role,
    currently = role, // string OR { role, company, url }; falls back to profile.role
  } = profile;
  const place = [location, coordinates].filter(Boolean);

  const { time, offset } = useClock(timezone);
  const now = typeof currently === "string" ? { role: currently } : currently || {};

  const scrollTo = (e, id) => {
    e.preventDefault();
    play("click");
    const el = document.querySelector(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -40 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero__top">
        <span className="status-badge">
          <span className="status-badge__dot" aria-hidden="true" />
          {availability}
        </span>
        <p className="hero__geo meta-tiny">
          {place.map((p) => `${p} · `)}
          <time>{time}</time> {offset}
        </p>
      </div>

      <div className="hero__stage">
        <h1 className="hero__name display-xl">{name}</h1>
        {image && (
          <figure className="hero__portrait">
            <img src={image} alt={`Portrait of ${name}`} />
          </figure>
        )}
      </div>

      <div className="hero__footer">
        <p className="hero__now">
          <span className="hero__now-label">Currently</span>
          {now.role}
          {now.company && (
            <>
              {" at "}
              {now.url ? (
                <a href={now.url} target="_blank" rel="noreferrer">{now.company}</a>
              ) : (
                <strong>{now.company}</strong>
              )}
            </>
          )}
        </p>

        <div className="hero__actions">
          <a className="hero-action-link" href="#work" onClick={(e) => scrollTo(e, "#work")}>
            See my work
          </a>
          <a className="hero-action-link hero-action-link--secondary" href="#contact" onClick={(e) => scrollTo(e, "#contact")}>
            Get in touch
          </a>
        </div>

        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-hint__line" />
          Scroll
        </div>
      </div>
    </section>
  );
}
