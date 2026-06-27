import { Icon } from "@/lib/icons";
import { why } from "@/lib/data";

export default function WhyGrid() {
  return (
    <div className="why" id="whyGrid">
      {why.map((w, i) => (
        <div
          key={w.title}
          className="why__item"
          data-reveal
          style={{ transitionDelay: `${(i % 4) * 60}ms` }}
        >
          <div className="why__ic">
            <Icon name={w.icon} />
          </div>
          <h3>{w.title}</h3>
          <p>{w.text}</p>
        </div>
      ))}
    </div>
  );
}
