import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export const Loader = ({ brandName, onComplete }) => {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const progress = { val: 0 };

      gsap.to(progress, {
        val: 100,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          setPercent(Math.floor(progress.val));
        },
        onComplete: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              if (onComplete) onComplete();
            },
          });

          tl.to(".loader__meta, .loader__pct, .loader__bar", {
            opacity: 0,
            duration: 0.3,
          })
            .to(
              ".loader__panel--top",
              { yPercent: -100, duration: 0.7, ease: "power4.inOut" },
              "-=0.1"
            )
            .to(
              ".loader__panel--bottom",
              { yPercent: 100, duration: 0.7, ease: "power4.inOut" },
              "<"
            );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loader" role="status">
      <div className="loader__panel loader__panel--top" />
      <div className="loader__panel loader__panel--bottom" />
      <div className="loader__meta">
        <div className="loader__brand">{brandName}</div>
        <div className="meta-tiny text-mute">INITIALIZING EXPERIENCE</div>
      </div>
      <div className="loader__pct font-mono">{percent}%</div>
      <div className="loader__bar">
        <div className="loader__bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
};