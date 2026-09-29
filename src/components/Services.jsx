import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Services({ services = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  // Desktop: pin the section and move the cards sideways while scrolling down.
  // Mobile / reduced motion: falls back to a native swipeable row.
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      section.classList.add("is-pinned");
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => section.classList.remove("is-pinned");
    });

    return () => mm.revert();
  }, [services.length]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <section id="services" ref={sectionRef} className="horizontal-wrap">
      <div className="section-pad">
        <p className="section-label">Capabilities — {pad(services.length)}</p>
        <h2 className="display-lg">What I do</h2>
      </div>

      <div className="horizontal-viewport">
        <div ref={trackRef} className="horizontal-track">
          {services.map((s, i) => (
            <article className="service-card" key={s.title || i}>
              <div className="service-card__num">{pad(i + 1)}</div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.description ?? s.desc}</p>
              <div className="service-card__media">
                {s.image ? (
                  <img src={s.image} alt="" loading="lazy" />
                ) : (
                  <div className="service-card__media-fallback" />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
