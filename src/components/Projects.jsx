import { useState } from "react";
import { CaseStudyModal } from "./CaseStudyModal";
import { useAudio } from "../context/SoundContext";

export const Projects = ({ projects }) => {
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState(null);
  const { playSynth } = useAudio();

  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section className="work" id="work" data-section-title="WORK">
      <div className="work__header">
        <div>
          <p className="section-label">Selected work — 003</p>
          <h2 className="display-lg">Projects</h2>
        </div>
        <p className="meta-tiny text-mute max-w-[24ch] text-right hidden sm:block">
          Click any row to open the complete Case Study breakdown.
        </p>
      </div>

      <div className="filter-bar" role="tablist">
        {[
          { key: "all", label: "All Work" },
          { key: "fullstack", label: "Full-Stack" },
          { key: "cloud", label: "Cloud & DevOps" },
          { key: "creative", label: "Creative / UI" }
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={`filter-pill ${filter === tab.key ? "is-active" : ""}`}
            onClick={() => {
              setFilter(tab.key);
              playSynth(440, "sine", 0.04);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <ul className="project-list" aria-label="Project list">
        {filtered.map((p) => (
          <li
            key={p.id}
            className="project-item"
            onClick={() => {
              setActiveProject(p);
              playSynth(900, "sine", 0.06);
            }}
            data-cursor="VIEW"
          >
            <div className="font-mono text-mute text-sm">{p.index}</div>
            <div>
              <h3 className="project-item__title">{p.title}</h3>
              <p className="text-mute text-sm mt-1">{p.summary}</p>
            </div>
            <div className="flex flex-wrap gap-1">
              {p.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-mute">
                  {t}
                </span>
              ))}
            </div>
            <div className="font-mono text-xs text-accent">{p.year} ↗</div>
          </li>
        ))}
      </ul>

      <CaseStudyModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
};