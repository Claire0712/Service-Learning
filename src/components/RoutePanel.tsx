import { Route } from "lucide-react";
import type { Attraction, Language } from "../types";

type RoutePanelProps = {
  language: Language;
  attractions: Attraction[];
};

export function RoutePanel({ language, attractions }: RoutePanelProps) {
  return (
    <section className="panel" aria-labelledby="route-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "游客服务" : "Visitor service"}</p>
          <h2 id="route-title">{language === "zh" ? "半日文旅路线" : "Half-day route"}</h2>
        </div>
        <Route size={22} />
      </div>

      <ol className="route-list">
        {attractions.map((attraction) => (
          <li key={attraction.id}>
            <div>
              <strong>{attraction.name[language]}</strong>
              <span>{attraction.duration[language]}</span>
            </div>
            <p>{attraction.description[language]}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
