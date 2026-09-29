import { useAudio } from "../context/SoundContext";

export const Footer = ({ brandName }) => {
  const { playSynth } = useAudio();

  const scrollToTop = () => {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    playSynth(600, "sine", 0.05);
  };

  return (
    <footer className="site-footer">
      <div>
        <div className="site-footer__name font-display font-bold text-xl">{brandName}</div>
        <p className="meta-tiny text-mute mt-2">© {new Date().getFullYear()} — All rights reserved.</p>
      </div>
      <button className="back-top" type="button" onClick={scrollToTop} data-cursor="TOP">
        Back to top ↑
      </button>
    </footer>
  );
};