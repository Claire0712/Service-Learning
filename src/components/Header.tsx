import { Database, Globe2, Languages, Search, WifiOff } from "lucide-react";
import type { Language, Perspective } from "../types";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  remoteMode: boolean;
  onRemoteModeChange: (enabled: boolean) => void;
  perspective?: Perspective | null;
  onPerspectiveChange?: (perspective: Perspective) => void;
};

export function Header({
  language,
  onLanguageChange,
  remoteMode,
  onRemoteModeChange,
  perspective,
  onPerspectiveChange,
}: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">{language === "zh" ? "服务学习研究原型" : "Service-learning research prototype"}</p>
        <h1>
          {language === "zh"
            ? "羊楼洞茶文旅与茶园遥感决策平台"
            : "Yangloudong Tea Culture and Remote-Sensing Decision Platform"}
        </h1>
        <p className="header-subtitle">
          {language === "zh"
            ? "面向游客服务与茶厂生产的双视角展示，整合文化资料、行程规划、NDVI 证据与无人机复查任务"
            : "A two-perspective research interface for visitor service and factory operations, linking cultural resources, itinerary planning, NDVI evidence, and UAV rechecking tasks"}
        </p>
      </div>

      <div className="header-actions" aria-label={language === "zh" ? "系统控制" : "System controls"}>
        {perspective && onPerspectiveChange ? (
          <div className="perspective-switch" aria-label={language === "zh" ? "视角切换" : "Perspective switch"}>
            <button
              className={perspective === "visitor" ? "segmented-button active" : "segmented-button"}
              type="button"
              onClick={() => onPerspectiveChange("visitor")}
            >
              {language === "zh" ? "游客" : "Visitor"}
            </button>
            <button
              className={perspective === "factory" ? "segmented-button active" : "segmented-button"}
              type="button"
              onClick={() => onPerspectiveChange("factory")}
            >
              {language === "zh" ? "茶厂" : "Factory"}
            </button>
          </div>
        ) : null}

        <button
          className="segmented-button"
          type="button"
          onClick={() => onLanguageChange(language === "zh" ? "en" : "zh")}
          aria-label={language === "zh" ? "切换到英文" : "Switch to Chinese"}
        >
          <Languages size={16} />
          {language === "zh" ? "中文" : "EN"}
        </button>

        <button
          className={remoteMode ? "segmented-button active" : "segmented-button"}
          type="button"
          onClick={() => onRemoteModeChange(!remoteMode)}
          aria-label={language === "zh" ? "切换联网模式" : "Toggle remote mode"}
        >
          {remoteMode ? <Globe2 size={16} /> : <WifiOff size={16} />}
          {remoteMode ? (language === "zh" ? "API/Search" : "API/Search") : language === "zh" ? "样例数据" : "Sample mode"}
        </button>

        <span className="status-pill">
          <Database size={14} />
          {language === "zh" ? "样例数据" : "Sample data"}
        </span>

        <span className="status-pill muted">
          <Search size={14} />
          {language === "zh" ? "Search 可用" : "Search ready"}
        </span>
      </div>
    </header>
  );
}
