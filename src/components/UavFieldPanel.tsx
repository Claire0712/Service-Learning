import { MapPinned } from "lucide-react";
import type { Language, Plot } from "../types";

type UavFieldPanelProps = {
  language: Language;
  plots: Plot[];
};

export function UavFieldPanel({ language, plots }: UavFieldPanelProps) {
  const matureCount = plots.filter((plot) => plot.maturity === "mature" || plot.maturity === "overripeRisk").length;
  const recheckCount = plots.filter((plot) => plot.maturity === "recheck" || plot.ndvi === null).length;
  const fieldImage = `${import.meta.env.BASE_URL}images/uav-demo-field.jpg`;

  return (
    <section className="panel uav-field-panel" aria-labelledby="uav-field-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{language === "zh" ? "无人机正射示范" : "UAV orthomosaic demo"}</p>
          <h2 id="uav-field-title">{language === "zh" ? "无人机示范田判读" : "UAV demonstration field reading"}</h2>
        </div>
        <MapPinned size={22} />
      </div>

      <figure className="field-figure">
        <div className="field-map">
          <img
            src={fieldImage}
            alt={language === "zh" ? "无人机扫描示范田正射影像" : "UAV orthomosaic image of the demonstration field"}
          />
          <span className="field-zone zone-mature">{language === "zh" ? "优先采摘区" : "Priority picking"}</span>
          <span className="field-zone zone-recheck">{language === "zh" ? "复查样方" : "Recheck quadrat"}</span>
          <span className="field-zone zone-access">{language === "zh" ? "作业入口" : "Access point"}</span>
          <span className="field-route route-one" />
          <span className="field-route route-two" />
        </div>
        <figcaption>
          {language === "zh"
            ? "示范田正射图用于把 NDVI、冠层颜色和道路可达性转成可执行的地块路径。当前叠层为演示标注，真实部署需接入地块边界和航测坐标。"
            : "The orthomosaic translates NDVI, canopy color, and access conditions into executable plot routes. Current overlays are demo annotations; deployment requires plot boundaries and UAV coordinates."}
        </figcaption>
      </figure>

      <div className="field-legend" aria-label={language === "zh" ? "判读图例" : "Reading legend"}>
        <div>
          <span className="legend-swatch mature" />
          <strong>{matureCount}</strong>
          <small>{language === "zh" ? "成熟/过熟风险地块" : "Mature or overripe-risk plots"}</small>
        </div>
        <div>
          <span className="legend-swatch recheck" />
          <strong>{recheckCount}</strong>
          <small>{language === "zh" ? "需无人机复查地块" : "Plots requiring UAV revisit"}</small>
        </div>
        <div>
          <span className="legend-swatch route" />
          <strong>4</strong>
          <small>{language === "zh" ? "已进入采摘路径节点" : "Stops in the picking route"}</small>
        </div>
      </div>

      <div className="field-reading">
        <strong>{language === "zh" ? "判读逻辑" : "Reading logic"}</strong>
        <p>
          {language === "zh"
            ? "先以茶垄连续性和冠层亮绿度圈定成熟候选区，再用 NDVI 与人工样方记录校验；道路和加工点距离用于决定采摘顺序。"
            : "Continuous tea rows and bright-green canopy identify maturity candidates, then NDVI and field samples validate them; road access and processing distance determine picking order."}
        </p>
      </div>
    </section>
  );
}
