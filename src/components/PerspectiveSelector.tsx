import { Factory, Map, Sprout } from "lucide-react";
import type { Language, Perspective } from "../types";

type PerspectiveSelectorProps = {
  language: Language;
  onSelect: (perspective: Perspective) => void;
};

export function PerspectiveSelector({ language, onSelect }: PerspectiveSelectorProps) {
  return (
    <section className="perspective-entry" aria-labelledby="perspective-title">
      <div className="entry-copy">
        <p className="eyebrow">{language === "zh" ? "选择使用视角" : "Choose your perspective"}</p>
        <h2 id="perspective-title">{language === "zh" ? "你今天从哪个角度使用智能体？" : "Which perspective do you need today?"}</h2>
      </div>
      <div className="perspective-cards">
        <button className="perspective-card visitor" type="button" onClick={() => onSelect("visitor")}>
          <Map size={26} />
          <strong>{language === "zh" ? "游客视角" : "Visitor perspective"}</strong>
          <span>
            {language === "zh"
              ? "历史文化、视频资料、出行住宿、采摘体验"
              : "History, videos, travel, lodging, and tea-picking experience"}
          </span>
        </button>
        <button className="perspective-card factory" type="button" onClick={() => onSelect("factory")}>
          <Factory size={26} />
          <strong>{language === "zh" ? "茶厂视角" : "Tea factory perspective"}</strong>
          <span>
            {language === "zh"
              ? "NDVI、无人机成熟度判断、采摘路径规划"
              : "NDVI, UAV maturity evidence, and picking-path planning"}
          </span>
        </button>
      </div>
      <div className="entry-note">
        <Sprout size={18} />
        {language === "zh"
          ? "第一版使用本地演示数据，外部平台以链接方式接入。"
          : "This demo uses local sample data and connects external platforms through links."}
      </div>
    </section>
  );
}
