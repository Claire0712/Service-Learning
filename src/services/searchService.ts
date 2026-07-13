import type { Language, Perspective } from "../types";

export type SearchScope = "general" | "video" | "travel" | "remoteSensing";

const defaultQueries: Record<Perspective, Record<Language, string>> = {
  visitor: {
    zh: "羊楼洞 青砖茶 万里茶道 旅游",
    en: "Yangloudong Qingzhuan tea Tea Road tourism",
  },
  factory: {
    zh: "茶园 NDVI 无人机 成熟度 采摘路径",
    en: "tea plantation NDVI UAV maturity harvest path",
  },
};

const scopeKeywords: Record<SearchScope, string> = {
  general: "",
  video: " video",
  travel: " travel hotel transport",
  remoteSensing: " NDVI UAV remote sensing tea maturity",
};

export function getSearchApiUrl() {
  return import.meta.env.VITE_SEARCH_API_URL?.trim() ?? "";
}

export function isSearchApiConfigured() {
  return getSearchApiUrl().length > 0;
}

export function getDefaultSearchQuery(perspective: Perspective, language: Language) {
  return defaultQueries[perspective][language];
}

export function buildSearchUrl(query: string, scope: SearchScope, language: Language) {
  const configuredApi = getSearchApiUrl();
  const trimmed = query.trim();
  const fallbackQuery = trimmed || (language === "zh" ? "羊楼洞 青砖茶" : "Yangloudong Qingzhuan tea");
  const scopedQuery = `${fallbackQuery}${scopeKeywords[scope]}`.trim();
  const params = new URLSearchParams({ q: scopedQuery, lang: language });

  if (configuredApi) {
    const separator = configuredApi.includes("?") ? "&" : "?";
    return `${configuredApi}${separator}${params.toString()}`;
  }

  return `https://www.bing.com/search?${params.toString()}`;
}
