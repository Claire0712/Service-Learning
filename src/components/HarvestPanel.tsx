import { CalendarClock, MapPinned } from "lucide-react";
import type { Language, Plot } from "../types";
import { getTopHarvestPlots } from "../services/localAgentService";

type HarvestPanelProps = {
  language: Language;
  plots: Plot[];
};

export function HarvestPanel({ language, plots }: HarvestPanelProps) {
  const ranked = getTopHarvestPlots(plots);

  return (
    <section id="harvest" className="panel harvest-panel" aria-labelledby="harvest-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "1-3 天计划" : "1-3 day plan"}</p>
          <h2 id="harvest-title">{language === "zh" ? "茶园采摘优先级" : "Harvest priority"}</h2>
        </div>
        <CalendarClock size={22} />
      </div>

      <div className="plot-list">
        {ranked.slice(0, 6).map((plot, index) => (
          <article className="plot-card" key={plot.id}>
            <div className="plot-rank">{index + 1}</div>
            <div className="plot-main">
              <div className="plot-title-row">
                <strong>{plot.id}</strong>
                <span className={`priority ${plot.priority.toLowerCase()}`}>{plot.priority}</span>
              </div>
              <p>{plot.reason[language]}</p>
              <div className="metric-row">
                <span>{plot.maturityLabel[language]}</span>
                <span>{plot.estimatedYieldKg} kg</span>
                <span>{plot.suggestedTime[language]}</span>
              </div>
              <div className="binding">
                <MapPinned size={14} />
                {plot.orderBinding[language]}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
