export const Manifesto = ({ manifesto }) => {
  return (
    <section className="statement" id="statement" aria-label="Manifesto">
      <p className="section-label">Manifesto — 001</p>
      <h2 className="statement__text">{manifesto}</h2>
    </section>
  );
};