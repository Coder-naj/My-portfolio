import { useEffect } from "react";
import { useAudio } from "../context/SoundContext";

export const CaseStudyModal = ({ project, onClose }) => {
  const { playSynth } = useAudio();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="case-study-modal is-open" role="dialog" aria-modal="true">
      <div className="case-study-modal__backdrop" onClick={onClose} />
      <div className="case-study-modal__dialog">
        <button
          type="button"
          className="modal-close-btn"
          onClick={() => {
            playSynth(350, "sine", 0.04);
            onClose();
          }}
          data-cursor="CLOSE"
        >
          ✕
        </button>

        <div className="case-study-modal__content">
          <div className="section-label">
            {project.categoryLabel} — {project.year}
          </div>
          <h2 className="font-display text-3xl font-bold text-accent mb-4">
            {project.title}
          </h2>
          <p className="text-bone text-base leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="my-6 p-4 rounded bg-white/5 border border-white/10">
            <h4 className="font-display font-bold text-sm text-bone uppercase mb-1">
              Architecture & Solution
            </h4>
            <p className="text-mute text-sm">{project.solution}</p>
          </div>

          <div className="my-6">
            <h4 className="font-display font-bold text-sm text-bone uppercase mb-2">
              Key Metric
            </h4>
            <div className="text-accent font-mono text-sm font-bold">
              {project.metrics}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded bg-white/5 border border-white/10 text-mute">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};