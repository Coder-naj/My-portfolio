import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const About = ({ profile }) => {
  const statsRef = useRef([]);

  useEffect(() => {
    statsRef.current.forEach((statEl) => {
      if (!statEl) return;
      const target = parseInt(statEl.dataset.count, 10);
      gsap.to(statEl, {
        scrollTrigger: { trigger: statEl, start: "top 85%" },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out"
      });
    });
  }, []);

  return (
    <section className="about-spread" id="about" data-section-title="ABOUT">
      <div className="about-spread__media" data-cursor="ME">
        <img
          src="./2.png"
          alt="Profile Portrait"
          loading="lazy"
        />
      </div>
      <div className="about-spread__copy">
        <p className="section-label">Profile — 002</p>
        <h2 className="display-lg">Engineering with intent. Designed for performance.</h2>
        <p className="text-mute text-lg leading-relaxed mt-4">
          I am a full-stack engineer and digital craftsman with a passion for designing scalable software, clean APIs, and elegant user-facing interactions.
        </p>
        <p className="text-mute text-lg leading-relaxed mt-4">
          With solid expertise across cloud architectures, automated DevOps pipelines, and interactive interfaces, I translate complex challenges into frictionless production systems.
        </p>

        <div className="about-spread__stats mt-8">
          {profile.stats.map((stat, idx) => (
            <div key={idx}>
              <div
                className="stat__num"
                data-count={stat.count}
                ref={(el) => (statsRef.current[idx] = el)}
              >
                0
              </div>
              <div className="stat__label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};