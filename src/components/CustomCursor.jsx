import { useEffect, useRef } from "react";
import { useSound } from "../context/SoundContext";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor]";

export function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const { play } = useSound();
  const playRef = useRef(play);

  useEffect(() => {
    playRef.current = play;
  }, [play]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return;

    document.body.classList.add("has-custom-cursor");
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    let mx = -100, my = -100, rx = -100, ry = -100;
    let raf = 0;
    let lastTarget = null;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      dot.classList.add("is-on");
      ring.classList.add("is-on");
      // feeds .mouse-spotlight in index.css
      document.documentElement.style.setProperty("--mouse-x", `${mx}px`);
      document.documentElement.style.setProperty("--mouse-y", `${my}px`);
    };

    const onOver = (e) => {
      const target = e.target.closest ? e.target.closest(INTERACTIVE) : null;
      if (target === lastTarget) return;
      lastTarget = target;

      const text = target?.getAttribute("data-cursor") || "";
      label.textContent = text;
      ring.classList.toggle("is-hovering", !!target);
      dot.classList.toggle("is-hovering", !!target);
      ring.classList.toggle("is-labelled", !!text);
      if (target) playRef.current("hover");
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");
    const onLeave = () => {
      dot.classList.remove("is-on");
      ring.classList.remove("is-on");
    };

    const tick = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
