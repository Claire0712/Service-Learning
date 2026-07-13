import { Radar, Route } from "lucide-react";
import type { Language, Plot } from "../types";

type SensingPathPanelProps = {
  language: Language;
  plots: Plot[];
};

export function SensingPathPanel({ language, plots }: SensingPathPanelProps) {
  const pathPlots = plots.filter((plot) => plot.pathStop > 0).sort((a, b) => a.pathStop - b.pathStop);
  const gapPlot = plots.find((plot) => plot.ndvi === null);
  const evidencePlots = plots.filter((plot) => plot.priority === "P1" || plot.priority === "P2").slice(0, 4);

  return (
    <section id="sensing" className="panel sensing-panel" aria-labelledby="sensing-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "NDVI + 无人机" : "NDVI + UAV"}</p>
          <h2 id="sensing-title">{language === "zh" ? "遥感成熟度依据" : "Remote-sensing maturity evidence"}</h2>
        </div>
        <Radar size={22} />
      </div>

      <p className="sensing-summary">
        {language === "zh"
          ? "NDVI + 无人机影像用于判断茶树冠层长势、颜色变化和成熟窗口；当前结果仍需与人工样方记录交叉校验。"
          : "NDVI + UAV imagery supports canopy vigor, color-change, and harvest-window assessment; results still need field-sample validation."}
      </p>

      <div className="sensing-grid">
        {evidencePlots.map((plot) => (
          <article className="sensing-card" key={plot.id}>
            <div className="card-row">
              <strong>{plot.id}</strong>
              <span className={`priority ${plot.priority.toLowerCase()}`}>{plot.priority}</span>
            </div>
            <div className="metric-row">
              <span>{plot.ndvi === null ? (language === "zh" ? "指数缺失" : "Index missing") : plot.ndvi.toFixed(2)}</span>
              <span>{Math.round(plot.confidence * 100)}%</span>
              <span>{plot.maturityLabel[language]}</span>
            </div>
            <p>{plot.canopyColor[language]}</p>
            <small>{plot.uavObservation[language]}</small>
          </article>
        ))}
      </div>

      <div className="path-block">
        <div className="panel-heading compact">
          <div>
            <p className="eyebrow">{language === "zh" ? "按地块号执行" : "Plot-based execution"}</p>
            <h2>{language === "zh" ? "采茶路径规划" : "Picking path plan"}</h2>
          </div>
          <Route size={20} />
        </div>
        <ol className="picking-path">
          <li>{language === "zh" ? "起点：茶园作业点" : "Start: garden operation point"}</li>
          {pathPlots.map((plot) => (
            <li key={plot.id}>
              {plot.id} · {plot.suggestedTime[language]} · {plot.estimatedYieldKg} kg
            </li>
          ))}
          <li>{language === "zh" ? "终点：加工/运输点" : "End: processing or transport site"}</li>
        </ol>
      </div>

      <div className="data-gap">
        <strong>{language === "zh" ? "数据缺口" : "Data gap"}</strong>
        <p>
          {language === "zh"
            ? `${gapPlot?.id ?? "待定"} 缺少最新多光谱复测，暂不直接加入采茶路径。`
            : `${gapPlot?.id ?? "TBD"} lacks the latest multispectral revisit and is not directly added to the picking path.`}
        </p>
      </div>
    </section>
  );
}
