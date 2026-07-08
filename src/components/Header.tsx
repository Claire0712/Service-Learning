import { Database, Globe2, Languages, Search, WifiOff } from "lucide-react";
import type { Language } from "../types";

type HeaderProps = {
  language: Language;
  onLanguageChange: (language: Language) => void;
  remoteMode: boolean;
  onRemoteModeChange: (enabled: boolean) => void;
};

export function Header({ language, onLanguageChange, remoteMode, onRemoteModeChange }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <p className="eyebrow">{language === "zh" ? "羊楼洞服务学习原型" : "Yangloudong service-learning prototype"}</p>
        <h1>{language === "zh" ? "AI + 茶文旅服务智能体" : "AI + Tea Culture and Tourism Agent"}</h1>
        <p className="header-subtitle">
          {language === "zh"
            ? "综合茶园采摘规划、游客导览、茶文化科普与商家供货建议"
            : "Integrated harvest planning, visitor guidance, tea culture, and merchant supply matching"}
        </p>
      </div>

      <div className="header-actions" aria-label={language === "zh" ? "系统控制" : "System controls"}>
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
          {remoteMode ? (language === "zh" ? "联网占位" : "Remote stub") : language === "zh" ? "本地演示" : "Local demo"}
        </button>

        <span className="status-pill">
          <Database size={14} />
          {language === "zh" ? "样例数据" : "Sample data"}
        </span>

        <span className="status-pill muted">
          <Search size={14} />
          {language === "zh" ? "Search 未配置" : "Search not configured"}
        </span>
      </div>
    </header>
  );
}
