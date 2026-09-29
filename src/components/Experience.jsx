export const Experience = ({ experience }) => {
  return (
    <section className="experience" id="experience" data-section-title="EXPERIENCE">
      <p className="section-label">Timeline — 006</p>
      <h2 className="display-lg">Experience</h2>
      <p className="text-mute max-w-[42ch] mb-8">
        A track record of shipping production software and scaling systems.
      </p>

      <div className="timeline">
        <div className="timeline__line" aria-hidden="true" />
        {experience.map((exp, idx) => (
          <div className="timeline-card" key={idx}>
            <div className="font-mono text-xs text-accent mb-1">{exp.period}</div>
            <h3 className="font-display font-bold text-lg">
              {exp.role} · <span className="text-mute">{exp.company}</span>
            </h3>
            <p className="text-mute text-sm mt-2 max-w-xl">{exp.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};