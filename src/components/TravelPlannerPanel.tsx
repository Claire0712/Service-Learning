import { ExternalLink, TrainFront } from "lucide-react";
import type { ExternalResource, Language } from "../types";

type TravelPlannerPanelProps = {
  language: Language;
  resources: ExternalResource[];
};

export function TravelPlannerPanel({ language, resources }: TravelPlannerPanelProps) {
  return (
    <section id="travel" className="panel travel-panel" aria-labelledby="travel-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "从出发到住宿" : "Departure to lodging"}</p>
          <h2 id="travel-title">{language === "zh" ? "行程规划" : "Trip planning"}</h2>
        </div>
        <TrainFront size={22} />
      </div>
      <div className="travel-steps">
        <div>
          <strong>{language === "zh" ? "1. 交通" : "1. Transport"}</strong>
          <p>{language === "zh" ? "先查到咸宁/赤壁周边站点，再转乘前往羊楼洞。" : "Check trains to Xianning/Chibi area, then transfer to Yangloudong."}</p>
        </div>
        <div>
          <strong>{language === "zh" ? "2. 住宿" : "2. Lodging"}</strong>
          <p>{language === "zh" ? "选择赤壁或羊楼洞周边住宿，预留茶园体验交通时间。" : "Choose lodging around Chibi or Yangloudong and reserve transfer time for the tea garden."}</p>
        </div>
        <div>
          <strong>{language === "zh" ? "3. 体验" : "3. Experience"}</strong>
          <p>{language === "zh" ? "将古街、博物馆和茶园采摘体验排在同一天半日路线内。" : "Combine the old street, museum, and tea-picking experience in one half-day route."}</p>
        </div>
      </div>
      <div className="resource-grid">
        {resources.map((resource) => (
          <a className="resource-link" href={resource.url} key={resource.id} rel="noreferrer" target="_blank">
            <span className={`resource-type ${resource.type}`}>{resource.type}</span>
            <strong>{resource.title[language]}</strong>
            <small>{resource.description[language]}</small>
            <ExternalLink size={15} />
          </a>
        ))}
      </div>
    </section>
  );
}
