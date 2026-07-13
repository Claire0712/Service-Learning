import { ExternalLink, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { buildSearchUrl, getDefaultSearchQuery, isSearchApiConfigured, SearchScope } from "../services/searchService";
import type { Language, Perspective } from "../types";

type SearchPanelProps = {
  language: Language;
  perspective: Perspective;
};

const scopeLabels: Record<SearchScope, { zh: string; en: string }> = {
  general: { zh: "综合资料", en: "General" },
  video: { zh: "视频资料", en: "Video" },
  travel: { zh: "交通住宿", en: "Travel" },
  remoteSensing: { zh: "遥感/NDVI", en: "Sensing" },
};

export function SearchPanel({ language, perspective }: SearchPanelProps) {
  const [query, setQuery] = useState(() => getDefaultSearchQuery(perspective, language));
  const [scope, setScope] = useState<SearchScope>(perspective === "factory" ? "remoteSensing" : "general");
  const searchUrl = useMemo(() => buildSearchUrl(query, scope, language), [language, query, scope]);
  const apiConfigured = isSearchApiConfigured();

  return (
    <section id="search" className="panel search-panel" aria-labelledby="search-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{apiConfigured ? "API Search" : language === "zh" ? "外部检索" : "External search"}</p>
          <h2 id="search-title">{language === "zh" ? "资料检索" : "Search resources"}</h2>
        </div>
        <Search size={22} />
      </div>

      <div className="search-controls">
        <label>
          {language === "zh" ? "检索关键词" : "Search query"}
          <input
            aria-label={language === "zh" ? "检索关键词" : "Search query"}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label>
          {language === "zh" ? "检索类型" : "Search scope"}
          <select value={scope} onChange={(event) => setScope(event.target.value as SearchScope)}>
            {(Object.keys(scopeLabels) as SearchScope[]).map((key) => (
              <option key={key} value={key}>
                {scopeLabels[key][language]}
              </option>
            ))}
          </select>
        </label>
        <a className="search-submit" href={searchUrl} target="_blank" rel="noreferrer">
          <ExternalLink size={16} />
          {language === "zh" ? "打开搜索" : "Open search"}
        </a>
      </div>

      <p className="search-note">
        {apiConfigured
          ? language === "zh"
            ? "已读取 VITE_SEARCH_API_URL，搜索会跳转到配置的接口。"
            : "VITE_SEARCH_API_URL is configured; search opens the configured endpoint."
          : language === "zh"
            ? "当前使用 Bing 外部搜索兜底；后续可通过 VITE_SEARCH_API_URL 接入自有 search API。"
            : "Currently falls back to Bing search; connect a custom search API later through VITE_SEARCH_API_URL."}
      </p>
    </section>
  );
}
