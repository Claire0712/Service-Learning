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
        <p className="eyebrow">{language === "zh" ? "选择视角" : "Select perspective"}</p>
        <h2 id="perspective-title">{language === "zh" ? "选择研究与服务视角" : "Select a research and service view"}</h2>
      </div>
      <div className="perspective-cards">
        <button className="perspective-card visitor" type="button" onClick={() => onSelect("visitor")}>
          <Map size={26} />
          <strong>{language === "zh" ? "游客视角" : "Visitor perspective"}</strong>
          <span>
            {language === "zh"
              ? "历史文化、视频资料、出行住宿、采摘体验规划"
              : "History, videos, travel, lodging, and harvest-experience planning"}
          </span>
        </button>
        <button className="perspective-card factory" type="button" onClick={() => onSelect("factory")}>
          <Factory size={26} />
          <strong>{language === "zh" ? "茶厂视角" : "Tea factory perspective"}</strong>
          <span>
            {language === "zh"
              ? "NDVI、无人机证据、成熟度判读、采摘路径"
              : "NDVI, UAV evidence, maturity reading, and picking paths"}
          </span>
        </button>
      </div>
      <div className="entry-note">
        <Sprout size={18} />
        {language === "zh"
          ? "第一版保留本地样例数据与外部链接，问答可通过服务端代理接入千问。"
          : "Version 1 keeps local sample data and external links, with Qwen support through a server-side proxy."}
      </div>
    </section>
  );
}
