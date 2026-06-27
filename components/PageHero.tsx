export default function PageHero({
  tag,
  title,
  lead,
}: {
  tag: string;
  title: string;
  lead: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="tag">{tag}</span>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}
