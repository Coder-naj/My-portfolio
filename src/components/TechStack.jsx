export const TechStack = ({ skills }) => {
  return (
    <section className="skills" id="skills" data-section-title="SKILLS">
      <header className="skills__intro">
        <p className="section-label">Toolkit — 005</p>
        <h2 className="skills__heading">Core Stack &amp; Technologies</h2>
        <p className="text-mute max-w-xl">
          Reliable instruments, frameworks, and workflows leveraged to ship mission-critical software.
        </p>
      </header>
      <div className="tech-stack">
        {skills.map((skill) => (
          <div key={skill} className="tech-pill">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
};